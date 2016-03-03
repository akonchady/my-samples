/*
Majority element
Link: http://www.geeksforgeeks.org/majority-element/
A majority element in an array A[] of size n is an element that appears more than n/2 times
(and hence there is at most one such element)

I/p: 3 3 4 2 4 4 2 4 4
O/p: 4

I/p: 3 3 4 2 4 4 2 4
O/p: NONE
 */

// MY METHOD: O(n)
var arr = [3, 3, 4, 2, 4, 4, 2, 4, 4], map={}, maxCount = arr.length / 2, output;

for(var i=0;i<arr.length;i++) {
    var val = arr[i];
    map[val] = map[val] ? ++map[val] : 1;

    if(map[val] > maxCount) {
        output = val;
        break;
    }
}

if(output) {
    console.log(output);
}
else {
    console.log('NONE');
}