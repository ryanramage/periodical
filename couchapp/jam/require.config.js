var jam = {
    "packages": [
        {
            "name": "couchr",
            "location": "jam/couchr",
            "main": "couchr-browser.js"
        },
        {
            "name": "director",
            "location": "jam/director",
            "main": "director.js"
        },
        {
            "name": "domReady",
            "location": "jam/domReady",
            "main": "domReady.js"
        },
        {
            "name": "events",
            "location": "jam/events",
            "main": "events.js"
        },
        {
            "name": "garden-app-support",
            "location": "jam/garden-app-support",
            "main": "garden-app-support.js"
        },
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jscss",
            "location": "jam/jscss",
            "main": "lib/index.js"
        },
        {
            "name": "moment",
            "location": "jam/moment",
            "main": "moment.js"
        },
        {
            "name": "querystring",
            "location": "jam/querystring",
            "main": "querystring.js"
        },
        {
            "name": "ractive",
            "location": "jam/ractive",
            "main": "Ractive.js"
        },
        {
            "name": "ractive-couch",
            "location": "jam/ractive-couch",
            "main": "ractive-couch.js"
        },
        {
            "name": "text",
            "location": "jam/text",
            "main": "text.js"
        },
        {
            "name": "underscore",
            "location": "jam/underscore",
            "main": "underscore.js"
        },
        {
            "name": "url",
            "location": "jam/url",
            "main": "url.js"
        }
    ],
    "version": "0.2.17",
    "shim": {
        "director": {
            "exports": "Router"
        },
        "underscore": {
            "exports": "_"
        }
    }
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "couchr",
            "location": "jam/couchr",
            "main": "couchr-browser.js"
        },
        {
            "name": "director",
            "location": "jam/director",
            "main": "director.js"
        },
        {
            "name": "domReady",
            "location": "jam/domReady",
            "main": "domReady.js"
        },
        {
            "name": "events",
            "location": "jam/events",
            "main": "events.js"
        },
        {
            "name": "garden-app-support",
            "location": "jam/garden-app-support",
            "main": "garden-app-support.js"
        },
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jscss",
            "location": "jam/jscss",
            "main": "lib/index.js"
        },
        {
            "name": "moment",
            "location": "jam/moment",
            "main": "moment.js"
        },
        {
            "name": "querystring",
            "location": "jam/querystring",
            "main": "querystring.js"
        },
        {
            "name": "ractive",
            "location": "jam/ractive",
            "main": "Ractive.js"
        },
        {
            "name": "ractive-couch",
            "location": "jam/ractive-couch",
            "main": "ractive-couch.js"
        },
        {
            "name": "text",
            "location": "jam/text",
            "main": "text.js"
        },
        {
            "name": "underscore",
            "location": "jam/underscore",
            "main": "underscore.js"
        },
        {
            "name": "url",
            "location": "jam/url",
            "main": "url.js"
        }
    ],
    "shim": {
        "director": {
            "exports": "Router"
        },
        "underscore": {
            "exports": "_"
        }
    }
});
}
else {
    var require = {
    "packages": [
        {
            "name": "couchr",
            "location": "jam/couchr",
            "main": "couchr-browser.js"
        },
        {
            "name": "director",
            "location": "jam/director",
            "main": "director.js"
        },
        {
            "name": "domReady",
            "location": "jam/domReady",
            "main": "domReady.js"
        },
        {
            "name": "events",
            "location": "jam/events",
            "main": "events.js"
        },
        {
            "name": "garden-app-support",
            "location": "jam/garden-app-support",
            "main": "garden-app-support.js"
        },
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jscss",
            "location": "jam/jscss",
            "main": "lib/index.js"
        },
        {
            "name": "moment",
            "location": "jam/moment",
            "main": "moment.js"
        },
        {
            "name": "querystring",
            "location": "jam/querystring",
            "main": "querystring.js"
        },
        {
            "name": "ractive",
            "location": "jam/ractive",
            "main": "Ractive.js"
        },
        {
            "name": "ractive-couch",
            "location": "jam/ractive-couch",
            "main": "ractive-couch.js"
        },
        {
            "name": "text",
            "location": "jam/text",
            "main": "text.js"
        },
        {
            "name": "underscore",
            "location": "jam/underscore",
            "main": "underscore.js"
        },
        {
            "name": "url",
            "location": "jam/url",
            "main": "url.js"
        }
    ],
    "shim": {
        "director": {
            "exports": "Router"
        },
        "underscore": {
            "exports": "_"
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}