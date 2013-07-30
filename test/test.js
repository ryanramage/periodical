var assert = require('assert'),
    path = require('path');
    build_settings = require('../lib/build_settings');

function console_mock(){};
console_mock.prototype.log = function(msg) {
    console.log(msg);
};

var output = new console_mock();

describe('match build specifier', function(){
    it('matches "master" with "refs/heads/master"', function(){
        var rows = build_settings.matchBuildSpecifier('refs/heads/master', [{_id: 1, key:['admin', 'https://github.com/garden20/garden-market-client', 'master']}]);
        assert.equal(1, rows.length);
    });

    it('does not match "develop" with "refs/heads/master"', function(){
        var rows = build_settings.matchBuildSpecifier('refs/heads/develop', [{_id: 1, key:['admin', 'https://github.com/garden20/garden-market-client', 'master']}]);
        assert.equal(0, rows.length);
    });

    it('matches "fauxton*" with "refs/heads/fauxton-122-fix-thing"', function(){
        var rows = build_settings.matchBuildSpecifier('refs/heads/fauxton-122-fix-thing', [{_id: 1, key:['admin', 'https://github.com/garden20/garden-market-client', 'fauxton*']}]);
        assert.equal(1, rows.length);
    });

    it('matches null with "refs/heads/fauxton-122-fix-thing"', function(){
        var rows = build_settings.matchBuildSpecifier('refs/heads/fauxton-122-fix-thing', [{_id: 1, key:['admin', 'https://github.com/garden20/garden-market-client', null]}]);
        assert.equal(1, rows.length);
    });
    it('matches "" with "refs/heads/fauxton-122-fix-thing"', function(){
        var rows = build_settings.matchBuildSpecifier('refs/heads/fauxton-122-fix-thing', [{_id: 1, key:['admin', 'https://github.com/garden20/garden-market-client', '']}]);
        assert.equal(1, rows.length);
    });

});

var mock_user_settings = {
   "npm": {
       "publish": true,
       "user": "ryan"
   },
   "jam": {
       "publish": true,
       "user": "ryan"
   }
};

var mock_build_settings = {
    "branch_specifier": "master",
    "service": {
       "jam": {
           "publish": false
       }
    }
};

describe('build settings join', function(){

    it('returns sane defaults for no settings at all', function(){
        var settings = build_settings.mergeSettings(null, null);
        assert.equal(settings.branch_specifier, null);
    });


    it('uses the local build settings as a priority', function(){
        var settings = build_settings.mergeSettings(mock_user_settings, mock_build_settings);
        assert.equal(settings.service.jam.publish, false);
        assert.ok(settings.service.npm.publish);
        assert.equal(settings.service.npm.user, "ryan");
    });

    it('handles no global settings', function(){
        var settings = build_settings.mergeSettings({}, mock_build_settings);

    });

});








