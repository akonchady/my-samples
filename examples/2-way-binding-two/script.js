var _n = 5, _nListeners = [];

function n(n) {
    if(arguments.length && n!=_n) {
        _n = n;
        _nListeners.forEach(function (listener) {
            listener(n);
        });
    }
    return _n;
}
n.subscribe =(function(newN) {
    console.log(newN);
});
n(10); //logs 10
n(10); //no output. value didn't change


console.log(n());
console.log(n(10));
console.log(n());
