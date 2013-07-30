var async = require('async');
var npm = require('npm');



exports.build = function(working_dir, output, callback) {



    var npm_ = null;
    async.series([
        function(cb){
            exports.init(output, function(err, n){
                npm_ = n;
                cb();
            });
        },
        function(cb){ exports.install(npm_, working_dir, cb); },
        function(cb){ exports.test(npm_,    working_dir, cb); }
    ], callback);
};

exports.init = function(output, cb) {

    npm.load({}, function(err) {
        if (err) return cb(err);
        var npmout = npm.registry.log;
        npmout.on('log', function(msg){
            if (msg.level === 'info' ) {
                var m = '[npm] ' + msg.prefix + ' ' + msg.message;
                console.log(m);
                if (output) output.log(m);
            }
        });
        cb(null, npm);
    });
};


exports.install = function(npm_, working_dir, callback) {
    console.log('running install');
    npm_.commands.install(working_dir, working_dir,  callback);
};

exports.test = function(npm_, working_dir, callback) {
    console.log('running test');
    npm_.commands["run-script"]([working_dir, 'test'], callback);
};


exports.publish = function(checkout_dir, service_settings, output, callback) {
    if (!service_settings.publish) return callback();

    exports.init(output, function(err, realNpm){
        _publish(realNpm, checkout_dir, service_settings, function(err, resp){
            if (err) console.log('ERROR: ', err),
            console.log('resp', resp);

            callback();
        });
    });
}

function _publish(npm_, working_dir, creds, callback) {

    npm_.config.set('_auth',     creds.auth);
    npm_.config.set('email',     creds.email);
    npm_.config.set('username',  creds.username);

    console.log('publishing', npm_.registry.conf);

    npm_.publish(working_dir, callback);
};


