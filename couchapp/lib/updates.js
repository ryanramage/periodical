exports.github = function (doc, req) {


    if (!doc) doc = {};

    doc._id = req.uuid;
    doc.type = 'commit';
    doc.state = 'pending';
    doc.token = null;
    if (req.query && req.query.Token) {
        doc.token = req.query.Token;
    }


    doc.github = JSON.parse(req.form.payload);

    doc.name = doc.github.repository.name;
    doc.repo = doc.github.repository.url;
    doc.ref  = doc.github.ref;
    doc.sha  = doc.github.after;
    doc.date = new Date().getTime();




    return [doc, 'Created'];

};