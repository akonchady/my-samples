(function (window) {
  // Very basic implementation of Promise for older browsers
  if (window.Promise === undefined) {
    var self;
    function Promise(fn) {
      self = this;
      this.handlers = [];
      fn(this.resolve);
      return this;
    }
    Promise.prototype.resolve = function (data) {
      self.handlers.map(function (callback) {
        callback(data);
      });
    };
    Promise.prototype.then = function (fn) {
      self.handlers.push(fn);
      return self;
    };
    window.Promise = Promise;
  }
})(window);