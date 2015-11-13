'use strict';

(function() {
    console.log('this: ' + this);
    var q = $('ul.people li');
    console.log(q);
})();