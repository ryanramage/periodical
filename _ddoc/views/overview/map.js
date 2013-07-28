function map(doc) {

    if (doc.type !== 'commit') return;
    emit([doc.repo, doc.ref, doc.date], null);


}