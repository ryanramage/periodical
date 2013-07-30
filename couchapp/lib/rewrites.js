module.exports = [
    { "description": "Access to this database" , "from": "_db" , "to"  : "../.." },
    { "from": "_db/*" , "to"  : "../../*" },
    { "description": "Access to this design document" , "from": "_ddoc" , "to"  : "" },
    { "from": "_ddoc/*" , "to"  : "*"},
    { "from": "_couch/*" , "to"  : "../../../*"},
    { "from": "/github/:token", "to": "_update/github", "query" : { "Token" : ":token" }},
    { "from": "/github", "to": "_update/github" },
    { "from": "/status.png", "to": "_show/status"},
    { "from": "/", "to": "index.html"},
    { "from": "/*", "to": "*"}
]
