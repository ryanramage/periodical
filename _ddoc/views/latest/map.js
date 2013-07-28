function map(doc) {

    if (doc.type !== 'commit') return;
    emit([doc.date, doc.repo, doc.ref], null);
}