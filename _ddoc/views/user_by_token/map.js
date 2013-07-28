function map(doc) {
    if (doc.type && doc.type === 'token') {
        emit(doc._id, doc.user);
    }
}