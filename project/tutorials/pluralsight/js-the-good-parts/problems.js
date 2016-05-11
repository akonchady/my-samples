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

function curry(binary, x) {
    return function(y) {
        return binary(x,y);
    }
}
inc = curry;

// Write methodize, a function that converts a binary function to a method
function methodize(fn) {
    return function(y) {
        return fn(this, y);
    }
};
Number.prototype.add = methodize(add);
(3).add(4); // 7

//Write demethodize, a function that converts a method to a binary function
function demethodize(fn) {
    return function(that, y) {
        return fn.call(that, y);
    }
}
demethodize(Number.prototype.add)(5, 6); // 11

// Write a function twice that takes a binary function and returns a unary function that passes its argument to the binary function twice
function twice(binary) {
    return function(x) {
        return binary(x,x);
    }
}
var double = twice(add);
double(11); //22
var square = twice(mul);
square(11); //121

// Write a function composeu that takes two unary functions and returns a unary function that calls them both.
function composeu(fn1, fn2) {
    return function(x) {
        return fn2(fn1(x));
    }
}
composeu(3); //36

// Write a function composeb that takes two binary functions and returns a function that calls them both.
function composeb(fn1, fn2) {
    return function(x,y,z) {
        return fn2(fn1(x,y), z)
    }
}
composeb(add, mul)(2,3,5);  //25

// Problems 13-15
// Write a function that allows another function to only be called once.
function once(binary) {
    var count = 0;
    return function(x, y) {
        count++;
        if(count>1) {
            throw new Error('Error');
        }
        return binary(x,y);
    }
}
add_once = once(add);
add_once(3,4); //7
add_once(3,4); //Error

// OR
function once(binary) {
    return function() {
        var f = binary;
        binary = null;
        return f.apply(this, arguments);
    }
}
add_once = once(add);
add_once(3,4); // 7
add_once(3,4); // Uncaught TypeError: Cannot read property 'apply' of null(…)

// Write a factory function that returns 2 functions that implement an up/down counter
function counterf(x) {
    return {
        inc: function() {
            return (x = x + 1);
        },
        dec: function() {
            return (x = x - 1);
        }
    }
}
counter = counterf(10);
counter.inc(); //11
counter.inc(); //10

// Make a revocable function that allows to revoke/grant access to call a function
function revocable(fn) {
    var allow = true;
    return {
        invoke: function() {
            if(!allow) {
                throw new Error('Access revoked');
            }
            debugger;
            return fn.apply(this, arguments);
        },
        revoke: function() {
            allow = false;
        },
        grant: function() {
            allow = true;
        }
    }
}
