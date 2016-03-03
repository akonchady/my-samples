/*
    Find the number occurring odd number of times
    Link: http://www.geeksforgeeks.org/find-the-number-occurring-odd-number-of-times/

    Given an array of positive integers. All numbers occur even number of times except one
    number which occurs odd number of times. Find the number in O(n) time & constant space.

    I/p: [1, 2, 3, 2, 3, 1, 3]
    O/p: 3
 */

// HashMap solution: Make a new hashmap and keep counts . O(n)

// XOR solution: 1 ^ 1 = 0, 1 ^ 0 = 1

var arr = [1,2,3,2,3,1,3], res=0;

for(var i=0;i<arr.length;i++) {
    res = res ^ arr[i];
}

console.log(res);