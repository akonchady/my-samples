/*
 Count frequencies of all elements in array in O(1) extra space and O(n) time

 Input: arr[] = {2, 3, 3, 2, 5}
 Output: Below are frequencies of all elements
 1 -> 0
 2 -> 2
 3 -> 2
 4 -> 0
 5 -> 1
 */
(function () {
    var arr = [2,3,3,2,5],
        temp;

    for (var i=0;i<arr.length;i++) {
        temp = arr[arr[i]];
        arr[arr[i]] = arr[i];
    }

    console.log(arr);
})();