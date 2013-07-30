module.exports = function(service_name, checkout_dir, service_settings, output, callback) {
    if (!service_settings) return callback();
    if (!service_settings.publish) return callback();


    var provider = require('./' + service_name);
    provider.publish(checkout_dir, service_settings, output, callback);
}