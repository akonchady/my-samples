(function() {
    function Scope() {
        this.$$watchers = []; //$$ indicates private to the Angular framework
    }

    Scope.prototype.$watch = function(watchFn, listenerFn) {
        var watcher = {
            watchFn: watchFn,
            listenerFn: listenerFn || function() {}
        };

        this.$$watchers.push(watcher);
    };

    Scope.prototype.$digest = function() {
        var self = this;

        _.forEach(this.$$watchers, function(watch) {
            var newValue = watch.watchFn(self);
            var oldValue = watch.last;
            if(newValue != oldValue) {
                watch.listenerFn(newValue, oldValue, self);
                watch.last = newValue;
            }
        });
    };

    var scope = new Scope();
    scope.firstName = 'Adarsh';
    scope.counter = 15;

    scope.$watch(function(scope) {
        return scope.firstName;
    },
    function(newValue, oldValue, scope) {
        scope.counter++;
    });

})();