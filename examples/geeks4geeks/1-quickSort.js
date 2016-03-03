/* Quick sort*/

var arr = [2,3,1,63,23,17];

function quickSort(arr, l, h) {
    var p;
    if (l < h) {
        p = partition(arr, l, h);
        quickSort(arr, l, p-1);
        quickSort(arr, p+1, h);
    }
}

function partition(arr, l, h) {
    var x = arr[h],
        i = l- 1,
        j;

    for (j=l;j<=h-1;j++) {
        if(arr[j] <= x) {
            i++;
            swap(arr, i, j);
        }
    }

    swap(arr, i+1, h);
    return (i+1);
}

function swap(refArr, i, j) {
    var temp = refArr[i];
    refArr[i] = refArr[j];
    refArr[j] = temp;
}

// quickSort(arr, 0, arr.length - 1);

// console.log(arr);

exports.quickSort = quickSort;