var path = require('path'),
    mkdirp = require('mkdirp'),
    couchr = require('couchr'),
    url = require('url'),
    Builder = new require('./lib/builder'),
    npm  = require('./lib/npm'),
    kanso_push = require('kanso/lib/commands/push')
    Trigger = require('./lib/trigger');





var couch_url = process.env.COUCH_URL || process.argv[2] || 'http://localhost:5984/periodical',
    trigger = new Trigger(couch_url),
    queue = require('./lib/queue')(couch_url, trigger),
    num_builders = 2, // make this an app_setting
    working_dir = path.join(__dirname, 'builds');
    // ensure the working dir exists
    mkdirp.sync(working_dir);

    console.log(couch_url);

function start() {
    // create the number of builders
    for (var i=0; i<num_builders; i++) {
        var num = i + 1;
        var builder = new Builder('Builder: ' + num, working_dir,  couch_url, queue);
        builder.start();
    }
    console.log("Ready to build");
}

// if the couchapp does not exist, upload it
var ddoc_url = url.resolve(couch_url + '/', './_design/periodical');
couchr.head(ddoc_url, function(err, resp){
    if (err && err.response && err.response.statusCode === 404) {
        kanso_push.run({ callback: start }, ["./couchapp", "http://admin:admin@localhost:5984/periodical"]);
    }
    else start();
});


