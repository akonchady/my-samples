/*
    Given a 2D array arr and an input arr aI, find all the combinations of rows mentioned in array aI in arr.


    arr
    A B C
    D E F
    G H I
    J K L

 Input (Row numbers):
    aI
    0 3

    Output: AJ, AK, AL, BJ, BK, BL, CJ, CK, CL

 Input:
    aI: 0 3 0
    Output: AJA, AJB, AJC, AKA, AKB, AKC, ALA, ALB, ALC
            BJA, BJB, BJC, BKA, BKB, BKC, BLA, BLB, BLC
            CJA, CJB, CJC, CKA, CKB, CKC, CLA, CLB, CLC

    Formula for number of rows in output: 3 ^ (number of elements in aI)
 */


var arr = [['A','B','C'], ['D','E','F'], ['G','H','I'], ['J','K','L']];

var aI = [0, 3, 2];
function print() {
    for(var i=0;i<3;i++) {
        for(var j=0;j<arr[i].length;j++) {
            for(var k=0;k<aI.length;k++) {
                console.log(arr[0][i] + '' + arr[3][j] + '' + arr[2][k]);
            }
        }
    }
}

