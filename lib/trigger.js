var events = require('events'),
    util = require('util'),
    url = require('url'),
    async = require('async'),
    couchr = require('couchr'),
    follow  = require('follow');


module.exports = Trigger;



var follow_options = {
        since: 'now',
        feed: 'continuous',
        filter: '_view',
        view: 'periodical/pending'
};


function Trigger(couch_url) {
    events.EventEmitter.call(this);
    this.couch_url = couch_url;
}

util.inherits(Trigger, events.EventEmitter);


Trigger.prototype.fetchNext = function(callback) {
    var self = this;

    var view_url = url.resolve(this.couch_url + '/', './_design/periodical/_view/pending');


    couchr.get(view_url, {limit: 1}, function (err, data){
        if (err) return callback(err);
        if (data.rows.length === 0) return self.follow(callback);
        callback(null, data.rows[0].id);
    });
};


Trigger.prototype.follow = function(callback) {

    // cheap clone
    var opts = JSON.parse(JSON.stringify(follow_options));
    opts.db = this.couch_url;

    var f = new follow.Feed(opts);

    f.on('error', function(err){
        f.stop();
        callback(err);
    });

    f.on('change', function(change) {
        f.stop();
        callback(null, change.id);
    });

    f.follow();
};











