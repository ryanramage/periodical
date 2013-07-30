exports.build_logs = {
    map: function (doc) {
        if (doc.type !== 'console') return;
        emit([doc.build_id, doc.date], null);
    }
};

exports.build_settings = {
    map : function (doc) {
        if (doc.type !== 'build_settings') return;
        emit([doc.repo, doc.branch], null);
    }
};

exports.build_settings_by_user = {
    map: function (doc) {
        if (doc.type !== 'build_settings') return;
        emit([doc.user, doc.repo, doc.branch], null);
    },
    reduce: '_count'
};

exports.latest = {
    map: function (doc) {
        if (doc.type !== 'commit') return;
        emit([doc.date, doc.repo, doc.ref], null);
    }
};
exports.pending = {
    map: function (doc) {
        if (doc.type && doc.type === 'commit' && doc.state && doc.state === 'pending') {
            emit(null, null);
        }
    }
};

exports.tokens_by_user = {
    map: function (doc) {
        if (doc.type && doc.type === 'token') {
            emit(doc.user, null); // the id is the token
        }
    }
};

exports.user_by_token = {
    map: function (doc) {
        if (doc.type && doc.type === 'token') {
            emit(doc._id, doc.user);
        }
    }
};