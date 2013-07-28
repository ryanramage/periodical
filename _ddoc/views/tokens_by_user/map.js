function map(doc) {
    if (doc.type && doc.type === 'token') {
        emit(doc.user, null); // the id is the token
    }
}