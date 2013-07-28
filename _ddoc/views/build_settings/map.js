function map(doc) {
    if (doc.type !== 'build_settings') return;
    emit([doc.repo, doc.branch], null);
}