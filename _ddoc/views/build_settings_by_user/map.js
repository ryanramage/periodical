function map(doc) {
    if (doc.type !== 'build_settings') return;
    emit([doc.user, doc.repo, doc.branch], null);
}