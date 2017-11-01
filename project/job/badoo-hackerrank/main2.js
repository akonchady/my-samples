//(function() {
/*
* Complete the function below. Some example usage is defined below
* First test case: add(1)(2)(3).result()
* Second test case: const sum1 = add(1)(2)(3); const sum2 = add(4)(5)(6); (sum1.result() + sum2.result())
*/
var obj = {};
function add(num) {
  if (!obj.sum) {
    obj.sum = 0;
  }
  obj.sum += num;
  return add;
}

add.result = function() {
  var sum = obj.sum;
  obj.sum = 0;
  return sum;
};


// console.log(add(1)(2)(3).result());
//})();