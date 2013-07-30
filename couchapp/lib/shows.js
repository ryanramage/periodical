exports.settings = function (doc, req) {
    var data = this.app_settings || {};
    return {
        'headers' : {'Content-Type' : 'application/json'},
        'body' :  JSON.stringify(data)
    };
};