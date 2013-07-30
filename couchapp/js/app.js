define([
    'garden-app-support',
    'couchr',
    'director',
    'ractive',
    'ractive-couch',
    'moment',
    'url',
    'text!templates/latest.html',
    'text!templates/userNavigation.html',
    'css/css'
], function(garden, couchr, director, Ractive, RactiveCouch, moment, url, list_t, nav_t){

    var app = {},
        routes = {
            '/latest' : latest,
            '/repo/*/*' : repo,
            '/build/*' : app.build
        },
        router;

    app.init = function() {
        garden.get_garden_ctx(function(err, ctx){
            ctx.repos = [];
            ctx.short_repo = short_repo;
            var uview = new Ractive({
                el: 'userNavigation',
                template: nav_t,
                data: ctx


            })
            if (ctx.userCtx && ctx.userCtx.name) {
                couchr.get('_ddoc/_view/build_settings_by_user',
                    {
                        startkey:[ ctx.userCtx.name],
                        endkey:[ ctx.userCtx.name, {}],
                        group: true,
                        group_level: 2
                    },
                    function(err, resp){
                        uview.set('repos', resp.rows)
                    }
                );
                couchr.get('_couch/_users/org.couchdb.user:' + ctx.userCtx.name, function(err, userDoc){
                    var settings = {
                        npm: false,
                        jam: false,
                        kanso: false
                    }
                    if (userDoc.npm) settings.npm = true;
                    if (userDoc.jam) settings.jam = true;
                });
            }

        });
    };

    function latest() {
        var rview = new RactiveCouch.View('_db', '_design/couch-ci/_view/latest', {
            el: 'pane2',
            template: list_t,
            include_docs: true,
            watch_added: true,
            view_options: {
                descending: true
            },
            data: {
                date_format: function(value) {
                    return moment(value).fromNow();
                },
                short_repo: short_repo
            }
        });
    }

    function repo(user, project) {
        console.log(user, project);
    }

    function short_repo(repo) {
        var parsed = url.parse(repo);
        return parsed.path.substring(1);
    }

    app.on_dom_ready = function() {
        router = director.Router(routes);
        router.init('/latest');
    };
    return app;
});