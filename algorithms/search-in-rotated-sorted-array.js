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
    if(arr[low] <= arr[mid]) {
        //left half is sorted
        if(arr[low] <= key && arr[mid] >= key) {
            return search(arr, low, mid-1, key);
        }
        else {
            return search(arr, mid+1, high, key);
        }
    }
    else {
        //right half is sorted
        if(arr[mid] <= key && arr[high] >= key) {
            return search(arr, mid+1, high, key);
        }
        else {
            return search(arr, low, mid-1, key);
        }
    }
}