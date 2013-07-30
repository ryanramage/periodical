/**
 * Load and ßidate all settings related to a build
 */

var url = require('url'),
    _ = require('lodash'),
    async = require('async'),
    couchr = require('couchr');

module.exports = compute_build_settings;
module.exports.mergeSettings = mergeSettings;
module.exports.matchBuildSpecifier = matchBuildSpecifier;

var default_settings = {
    branch_specifier: null,
    service: {}
};


function compute_build_settings(couch_url, repo, branch, token, cb) {




    getUserFromToken(couch_url, token, function(err, username){
        if (err) cb('No user associated with passed token');
        // get the global settings .



        var build_settings_url = url.resolve(couch_url + '/', './_design/periodical/_view/build_settings_by_user');
        var user_url = url.resolve(couch_url, '/_users/org.couchdb.user:' + username);


        async.parallel({
            user_doc: async.apply(couchr.get, user_url),
            build_settings: async.apply(couchr.get, build_settings_url, { include_docs: true, reduce: false, startkey: [username, repo], endkey: [username, repo, {}] })
        }, function(err, data){
            if (err) return cb(err);

            var to_build = matchBuildSpecifier(branch, data.build_settings[0].rows);
            if (to_build.length === 0) to_build = [{ doc: { settings: default_settings }}];


            var clean_user_doc = data.user_doc[0];
            delete clean_user_doc._id;
            delete clean_user_doc._rev;
            delete clean_user_doc.type;
            delete clean_user_doc.roles;
            delete clean_user_doc.name;
            delete clean_user_doc.salt;
            delete clean_user_doc.password_sha;



            async.each(to_build, function(build, callback){
                console.log('------------******************------------');
                build.settings = mergeSettings(clean_user_doc, build.doc.settings);

                console.log(build);

                callback();
            }, function(err){
                cb(err, to_build);
            });
        });


    });
 }


function getUserFromToken(couch_url, token, cb) {
    var user_token_url = url.resolve(couch_url + '/', token);
    console.log(user_token_url);
    couchr.get(user_token_url, function(err, user_token_doc) {
        if (err) return cb(err);
        console.log('user name', user_token_doc.user);
        cb(null, user_token_doc.user);
    });
}





function mergeSettings(user_doc, build_settings) {
    var settings = _.cloneDeep(default_settings);
    if (!build_settings) build_settings = {};

    settings.branch_specifier = build_settings.branch_specifier || settings.branch_specifier;
    settings.service = _.merge(user_doc, build_settings.service);

    return settings;
}




function matchBuildSpecifier(build_branch, rows) {
    var matches = [];
    if (!rows || rows.length === 0) return matches;
    rows.forEach(function(row){
        var row_branch_specifier = row.key[2];

        if (!row_branch_specifier || row_branch_specifier === '') {
            row_branch_specifier = '.*';
        }

        var actual_branch = build_branch.split('/')[2];
        if (actual_branch.match(row_branch_specifier)) matches.push(row);

    });
    return matches;
}

