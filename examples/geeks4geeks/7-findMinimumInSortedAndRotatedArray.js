/*
 Find the minimum element in a sorted and rotated array
 Link: http://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/
 */

var arr = [5,6,7,8,9,10,1,2,3,4];

function findMinIndex(arr, l, h) {
    if(l > h) {
        return -1;
    }
    if(l===h) {
        return l;
    }

    var mid = Math.floor((l+h) / 2);
    if(mid < h && arr[mid] > arr[mid+1]) {
        return mid+1;
    }
    else if(mid > l && arr[mid] < arr[mid-1]) {
        return mid;
    }
    else if(arr[l] >= arr[mid]) { // since we are searching for max element and then deducing min element from it
        return findMinIndex(arr, l, mid-1);
    }
    else {
        return findMinIndex(arr, mid+1, h);
    }
}

var minElement = findMinIndex(arr, 0, arr.length - 1);

console.log('Minimum element: ' + arr[minElement]);