function Promise() {

   var data,
       done = [],
       failed = [],
       status = 'progress';

   this.done = function(fn) {
       done.push(fn);

       // If done called when the status is 'done', just call the method
       if (status === 'done') {
           fn(data);
       }

       // Support method chaining
       return this;
   };

   this.failed = function (fn) {
       failed.push(fn);

       if (status === 'failed') {
           fn(data);
       }

       return this;
   };

   this.resolve = function (result) {
       if (status != 'progress') {
          throw 'Object is already resolved/failed';
       }

       status = 'done';
       data = result;

       for (var i=0;i<done.length;i++) {
           done[i](data);
       }

       return this;
   };

   this.fail = function (result) {
       if (status != 'progress') {
           throw 'Object is already resolved/failed';
       }

       status = 'failed';
       data = result;

       for (var i=0;i<failed.length;i++) {
           failed[i](data);
       }

       return this;
   };
};

module.exports = Promise;