//1-5
function identity(x) {
    return x;
}

identity(3); //3

function add (x, y) {
    return x + y;
}

function mul (x, y) {
    return x * y;
}

function identityf (x) {
    return function () {
        return x;
    }
}

function addf (x) {
    return function (y) {
        return x + y;
    }
}

function applyf(binary) {
    return function (x) {
        return function (y) {
            return binary(x, y);
        }
    }
}

//6 - 9
function curry(fn, x) {
    return function(y) {
        return fn(x, y);
    }
}

curry(add, 3)(4); //7
curry(mul, 3)(4); //12

// Another way to write curry:
function curry1(fn, x) {
    return applyf(fn)(x);
}

//For variable number of arguments
function curryGeneric(fn, x) {
    var slice = Array.prototype.slice,
        oldArgs = slice.call(arguments, 1);

    return function() {
        var newArgs = slice.call(arguments, 1);
        return fn.apply(null, oldArgs.concat(newArgs));
    }
}
//Link: http://www.natansh.in/2012/07/27/schonfinkelization/

//3 ways to enable
/*

inc(5) -> 6
inc(inc(5)) -> 7

1. var inc = addf(1)

inc(5) //6

2.
 */
