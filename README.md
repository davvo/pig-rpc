# pig-rpc
simple rpc using [zeromq](http://zeromq.org/) and [pigato](https://github.com/prdn/pigato)

## Prerequisites
You need to [install zeromq](http://zeromq.org/intro:get-the-software). On OSX you can use homebrew:
```sh
> brew update
> brew install zeromq 
```

##Install
```sh
> npm install pig-rpc
```

## Example

### Broker
```sh
var pig = require('pig-rpc')('tcp://*:55555');

pig.broker(function () {
  console.log('Broker started.');
});
```

### Worker
```sh
var pig = require('pig-rpc')('tcp://localhost:55555');

pig.handle('square', function (num, callback) {
  callback(Math.pow(num, 2));
});
```

### Client
```sh
var pig = require('pig-rpc')('tcp://localhost:55555');

pig.call('square', 9, function (err, res) {
  console.log('The square of 9 is', res);
});
```
