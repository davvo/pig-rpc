var pigato = require('pigato');

module.exports = function (options) {

    options = options || {};

    if (typeof options === 'string') {
        options = {
            url: options
        };
    }

    var broker, client, workers = [];

    return {
        broker: function (callback) {
            broker = new pigato.Broker(options.url);
            broker.start(callback);
        },

        call: function (service, data, callback) {
            if (!client) {
                client = new pigato.Client(options.url);
                client.start();
            }
            client.request(service, data).on('data', callback.bind(null, null));
        },

        handle: function (service, handler) {
            var worker = new pigato.Worker(options.url, service);
            workers.push(worker);
            worker.start();
            worker.on('request', function(data, reply) {
                handler(data, function (result) {
                    reply.end(result);
                });
            });
        },

        stop: function () {
            client.stop();
            workers.forEach(function (worker) {
                worker.stop();
            });
        }
    };
}