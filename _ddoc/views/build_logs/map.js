function map(doc) {
    if (doc.type !== 'console') return;

    emit([doc.build_id, doc.date], null);
}