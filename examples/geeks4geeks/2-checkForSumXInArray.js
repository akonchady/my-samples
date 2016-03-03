/*
    Given an array A[] and a number x, check for pair in A[] with sum as x

    Link: http://www.geeksforgeeks.org/write-a-c-program-that-given-a-set-a-of-n-numbers-and-another-number-x-determines-whether-or-not-there-exist-two-elements-in-s-whose-sum-is-exactly-x/
 */


// Method 1: Usual for loop. n squared complexity
/*
var arr = [1,2,3,4,5];

var x = 7;

for(var i=0;i<arr.length - 1;i++) {
    for(var j=0;j<arr.length;j++) {
        if((arr[i] + arr[j]) === x) {
            console.log('i: ' + arr[i] + ' j: ' + arr[j]);
        }
    }
}*/

// Method 2: Sorting
/*var sortRef = require('./1-quickSort.js');

var arr = [5,3,1,4,2], i, l = 0, h = arr.length - 1, x = 7;
sortRef.quickSort(arr, 0, arr.length - 1);

console.log(arr);

while(l<h) {
    var sum = arr[l] + arr[h];
    if(sum === x) {
        console.log(arr[l] + ', ' + arr[h]);
        l++;
    }
    else if(sum < x) {
        l++;
    }
    else {
        h--;
    }
}*/

// Method 3: Hashmap O(n)
var arr = [5,3,1,4,2], map=[], x=7;

for(var i=0;i<arr.length;i++) {
    if(map[x - arr[i]]) {
        console.log((x-arr[i]) + ', ' + arr[i]);
    }
    map[arr[i]] = 1;
}

