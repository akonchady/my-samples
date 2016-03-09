/*
 Search an element in a sorted and rotated array
 Link: http://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/
 */

/*
Solution 1: O(log n)
 */
var arr = [4,5,6,7,8,9,1,2,3];
// var arr = [1,2,3,4,5];

function binarySearch(arr, ele, l, h) {
    if(l > h) {
        return -1;
    }
    else {
        var mid = Math.floor((l + h) / 2);

        if(arr[mid] === ele) {
            // console.log('Element found at index ' + mid);
            return mid;
        }
        else if(ele < arr[mid]) {
            return binarySearch(arr, ele, l, mid - 1);
        }
        else {
            return binarySearch(arr, ele, mid+1, h);
        }
    }
}

// binarySearch(arr, 4, 0, arr.length - 1);

function findPivot(arr, l, h) {
    // base cases
    if (l > h) {
        return -1;
    }
    if(l === h) {
        return l;
    }

    var mid = Math.floor((l+h) / 2);
    if(mid < h && arr[mid] > arr[mid+1]) {
        return mid;
    }
    else if(mid > l && arr[mid] < arr[mid-1]) {
        return mid-1;
    }
    else if(arr[l] >= arr[mid]) {
        return findPivot(arr,l, mid-1);
    }
    else {
        return findPivot(arr, mid+1,h);
    }
}

function pivotedBinarySearch(arr, ele, l, h) {
    var n = arr.length,
        l= 0,
        h = n - 1,
        pivot = findPivot(arr, l, h);

    console.log('pivot: ' + pivot);

    // If we didn't find a pivot, then the array is not rotated at all.
    if(pivot === -1) {
        return binarySearch(arr, ele, l, h);
    }

    // If we found a pivot, then first compare with pivot and then
    // search in two subarrays around pivot
    if(ele === arr[pivot]) {
        return pivot;
    }
    else if(arr[0] <= ele) {
        return binarySearch(arr, ele, l, pivot-1);
    }
    else {
        return binarySearch(arr, ele, pivot+1, h);
    }
}

console.log(pivotedBinarySearch(arr,4, 0, arr.length - 1));