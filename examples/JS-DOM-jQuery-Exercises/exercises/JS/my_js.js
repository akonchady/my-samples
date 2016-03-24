// 05 Context
DOT = function(obj, prop){
    if(obj.hasOwnProperty(prop)) {
        return obj[prop];
    }
    else if(obj.__proto__) {
        return DOT(obj.__proto__, prop);
    }
    else {
        return false;
    }
};

// 05 Context
DOTCALL = function(obj, prop, args){
    var fn = DOT(obj, prop);

    if(fn) {
        return fn.apply(obj, args);
    }
};

// 06 Prototypes
NEW = function(constructor, args){
    // var obj = Object.create(constructor.prototype);
    var obj = {};
    obj.__proto__ = constructor.prototype;
    var retValue = constructor.apply(obj, args);
    if(typeof retValue === 'object') {
        return retValue;
    }
    else {
        return obj;
    }
};

INSTANCEOF = function(obj, constructor){
    if(obj.constructor === constructor) {
        return true;
    }
    else if(obj.__proto__) {
        return INSTANCEOF(obj.__proto__, constructor);
    }
    else {
        return false;
    }
};