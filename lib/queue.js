var async = require('async'),
    txn = require('txn'),
    os = require('os'),
    host= {
        hostname: os.hostname(),
        platform: os.platform()
    };


module.exports = queue;


function queue(couch_url, trigger) {


    var q = async.queue(function(builder, cb) {

        console.log('[queue]', builder.name);
        var called = false;

        trigger.fetchNext(function(err, doc_id) {
            if (err) return cb(err);
            var doc_url = couch_url + '/' + doc_id;
            txn({uri: doc_url}, claim_pending, function(err2, doc) {
                if (err2) return cb(err2);

                process.nextTick(function(){
                    builder.run(doc);
                });
                cb();



            });


        });

    }, 1);

    return q;

}

function claim_pending(doc, to_txn) {
    doc.state = "running";
    doc.claimed = true;
    doc.host = host;
    return to_txn();
}
