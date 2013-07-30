var couchr = require('couchr');


// buffer up a some logs, and then post to couch
module.exports = Console;


function Console(build_id, couch_url, limit) {
    this.build_id = build_id;
    this.couch_url = couch_url;
    this.limit = limit || 8192; // 8kb
    this.buf = [];
    this.size = 0;
}


Console.prototype.log = function(msg) {

    var len = Buffer.byteLength(msg);
    this.size += len;
    this.buf.push(msg);
    if (this.size > this.limit) this.flush();
};

Console.prototype.flush = function() {
    couchr.post(this.couch_url, {
        type: 'console',
        build_id: this.build_id,
        date: new Date().getTime(),
        text: this.buf
    }, function(err, resp){});
    this.buf.length = 0;
    this.size = 0;
};