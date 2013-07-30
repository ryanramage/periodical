var jam = require('jamjs');
var spawn = require('child_process').spawn,
    rimraf = require('rimraf'),
    url = require('url'),
    path = require('path');


exports.publish = function(checkout_dir, service_settings, output, callback) {
    console.log('jam publishing');
    console.log(service_settings);
    if (!service_settings.publish) return callback();
    if (!service_settings.repo) service_settings.repo = 'http://jamjs.org/repository';

    var parsed_url = url.parse(service_settings.repo);
    parsed_url.auth = service_settings.username + ':' + service_settings.password;
    service_settings.url = url.format(parsed_url);
    exports.runJam(checkout_dir, service_settings,  output, function(err, resp) {
        console.log(err, resp);
        callback(err);
    });
}



exports.runJam = function (working_dir, opts, output, callback) {
    opts.silent = false;

    var bin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'jam');

    var args = ['publish', working_dir, '-r', opts.url];
    var jam = spawn(bin, args, {silent: false});

    jam.stdout.on('data', function (data) {
        console.log(data.toString());
        if (output) output.log(data.toString());
    });
    jam.stderr.on('data', function (data) {
        console.log(data.toString());
        if (output) output.log(data.toString());
    });
    jam.on('exit', function (code) {
        if (code !== 0 && !opts.expect_error) {
            return callback(
                new Error('Returned status code: ' + code)
            );
        }
        callback(null);
    });
    //jam.disconnect();
};