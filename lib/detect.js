var path = require('path'),
    fs = require('fs'),
    async = require('async');



exports.style = function(build_dir, callback) {

    async.parallel({
        'make': function(cb) { exports.is_makefile(build_dir, cb); },
        'grunt':    function(cb) { exports.is_grunt(build_dir   , cb); },
        'npm':      function(cb) { exports.is_npm_test(build_dir, cb); }
    }, callback);
};


exports.is_makefile = function(build_dir, cb) {
    var test = path.join(build_dir, 'Makefile');
    fs.stat(test, function(err, stats) {
        if (err) return cb(null, false);
        if (stats.isFile) cb(null, true);
    });
};

exports.is_grunt = function(build_dir, cb) {
    var test = path.join(build_dir, 'Gruntfile.js');
    fs.stat(test, function(err, stats) {
        if (err) return cb(null, false);
        if (stats.isFile) cb(null, true);
    });
};

exports.is_npm_test = function(build_dir, cb) {
    var test = path.join(build_dir, 'package.json');
    fs.stat(test, function(err, stats) {
        if (err) return cb(null, false);
        if (stats.isFile) {
            fs.readFile(test, function(err, data){
                if (err) return cb(null, false);

                var p = JSON.parse(data);
                if (p.scripts && p.scripts.test) return cb(null, true);

                cb(null, false);
            });
        }
    });
};
