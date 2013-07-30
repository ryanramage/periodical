module.exports = Builder;

var path = require('path'),
    async = require('async'),
    mkdirp = require('mkdirp'),
    rimraf = require('rimraf'),
    gitgo = require('gitgo'),
    uuid = require('uuid'),
    Console = require('./Console'),
    detect = require('./detect'),
    publish = require('./publish'),
    build_settings = require('./build_settings');


function Builder(name, working_dir, couch_url, queue) {
    this.name = name;
    this.working_dir = working_dir;
    this.couch_url = couch_url;
    this.queue = queue;
}

Builder.prototype.start = function() {
    var self = this;
    console.log('Starting builder', this.name);
    this.queue.push(self, function(err){});
};

Builder.prototype.run = function(doc) {
    var self = this;

    console.log('Running Builder', this.name);

    var dir = doc._id;
    var project_build_dir = path.join(this.working_dir, dir);
    mkdirp.sync(project_build_dir);

    // getting build settings
    console.log('getting build configurations');
    build_settings(this.couch_url, doc.repo, doc.ref, doc.token, function(err, configurations){

        console.log('There are ', configurations.length, ' configurations for this project and branch');
        async.eachSeries(configurations, function(config){
            var build_id = uuid.v4();
            var build_dir = path.join(project_build_dir, build_id);
            mkdirp.sync(build_dir);

            console.log('running config', config.settings);


            console.log(self.name, ' cloning into ', build_dir);
            gitgo(build_dir, ['clone', doc.repo])
                .on('end', function(){
                    self.startBuild(doc, build_dir, config);
                })
                .on('error', function(){
                    self.failBuild(doc, 'could not clone source repo');
                });
        });

    });
};

Builder.prototype.startBuild = function(doc, build_dir, config) {
    var self = this;

    var checkout_dir = path.join(build_dir, doc.name);
    console.log(this.name, ' Building in ', checkout_dir);

    var output = new Console(doc._id, this.couch_url);

    var services = [ 'npm', 'jam'],
        results = {};

    async.eachSeries(services, function(service_name, cb) {
        var service_settings = config.settings.service[service_name];
        publish(service_name, checkout_dir, service_settings, output, function(err, status){
            results[service_name] = {
                err: err,
                status: status
            };
            cb();
        });
    }, function(err){
        output.flush();
        self.postBuild(build_dir);
    });


};

Builder.prototype.failBuild = function(doc, err) {
    console.log(this.name, ' build failed', err);
    this.postBuild(build_dir);
};


Builder.prototype.postBuild = function(build_dir, cb) {
    var self = this;
    console.log(this.name, ' cleaning build dir', build_dir);
    rimraf(build_dir, function(err){
        self.queue.push(self, function(err){});
    });
}





