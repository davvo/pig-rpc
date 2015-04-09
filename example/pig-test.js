var pig = require('..');

var rpc = pig('tcp://127.0.0.1:55555');

rpc.broker(function () {
    console.log('broker started');

    rpc.handle('square', function (num, callback) {
        callback(Math.pow(num, 2));
    });

    function printSquare(num) {
        rpc.call('square', num, function (err, res) {
            console.log('quare of %d is %d', num, res);
        });
    }

    [1, 2, 3, 4, 5].forEach(printSquare);
});