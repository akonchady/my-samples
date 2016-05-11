(function () {
    var Promise = require('./promise.js');
    var promise = new Promise();

    setTimeout(function() {
        promise.resolve('promise 1 resolved');
    }, 2000);

    promise.done(function(data) {
       console.log(data);
    });

    var promise2 = new Promise();
    promise2.failed(function(data) {
        console.log(data);
    });

    setTimeout(function() {
        promise2.fail('promise 2 failed');

        promise2.failed(function(data) {
            console.log('Any future promise2 failed calls will be done immediately. Data: ' + data);
        });
    }, 4000);

    console.log('Application completed');
})();