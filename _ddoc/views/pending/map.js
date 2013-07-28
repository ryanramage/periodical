function map(doc) {
    if (doc.type && doc.type === 'commit' && doc.state && doc.state === 'pending') {
        emit(null, null);
    }
}