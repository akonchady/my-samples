/*
  Problem: Search in an right rotated sorted array. You don't know how many times it was rotated.
  Reference : http://stackoverflow.com/questions/4773807/searching-in-an-sorted-and-rotated-array
 */

function search(arr, low, high, key) {
    mid = Math.floor((low+high)/2);

    if(low > high) {
        return -1;
    }

    if(arr[mid] == key) {
        return mid;
    }

    /* If arr[l...mid] is sorted */
    if(arr[low] <= arr[mid]) {
        /* As this subarray is sorted, we can quickly
         check if key lies in half or other half */
        if(arr[low] <= key && arr[mid] >= key) {
            return search(arr, low, mid-1, key);
        }

        // if key is not present in left half..search right half.
        return search(arr, mid+1, high, key);
    }
    else {
        /* If arr[l..mid] is not sorted, then arr[mid... r]
         must be sorted*/
        if(arr[mid] <= key && arr[high] >= key) {  // if key is present in right half.
            return search(arr, mid+1, high, key);
        }

        // if key is not present in right half..search in left half.
        return search(arr, low, mid-1, key);
    }
}

var arr = [4,5,6,7,8,9,1,2,3];

console.log(search(arr, 0, arr.length - 1, 7));