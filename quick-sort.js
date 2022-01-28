// ====================================================
// fundamental sort algorithms: quick sort implementation
// ====================================================

// utility function to swap two elements
function swap(arr,i,j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function partition(arr,leftIndex,rightIndex) {
    let pivot = arr[leftIndex]
    let i = leftIndex 
    let j = rightIndex

    while (i < j) {
        console.log(`while i < j (${i} < ${j})`)
        while (arr[i] < pivot) {
            i++
        }
        while (arr[j] > pivot) {
            j--
        }
        if (i <= j) {
            console.log(arr)
            swap(arr,i,j)
            i++ 
            console.log(arr)
            console.log(`return index = ${i}`)
        }
    }

    console.log('partition complete')
    return i
}

function quickSort(arr,leftIndex,rightIndex) {
    if (arr.length > 1) {
        let index = partition(arr,leftIndex,rightIndex)
        console.log(`index = ${index}, leftIndex = ${leftIndex}`)
        if (leftIndex < index - 1) {
            console.log(`${leftIndex} < ${index} - 1`)
            console.log('another one w decremented index as j')
            quickSort(arr,leftIndex,index - 1) // take it back and do another swap
        }
        if (index < rightIndex) {
            console.log(`index < rightIndex (${index} < ${rightIndex})`)
            console.log('move to new index')
            quickSort(arr,index,rightIndex)
        }
    }
    return arr
}

let arr1 = [1,55,90,7,23,82,100]
let startIndex = 0
let endIndex = arr1.length - 1
let sortedArr = quickSort(arr1,startIndex,endIndex)
console.log(sortedArr)

// WALKTHROUGH
// =================
// quickSort( [1,55,90,7,23,82,100], 0, 6 )
// leftIndex = 0, rightIndex = 6
// arr.length = 6
// arr.length > 1
// index = partition( [1,55,90,7,23,82,100], 0, 6 )
// pivot = arr[0] = 1
// i = leftIndex = 0
// j = rightIndex = 6
// i < j...
// arr[j] > pivot
// j = 5... 4... 3... 2... 1... 0
// i = 0
// j = 0
// i <= j
// swap arr[i] and arr[j] (1 and 1)
// [1,55,90,7,23,82,100] to [1,55,90,7,23,82,100]
// i++, return new i
// back to quickSort
// index = 1
// i = 0
// j = 6
// index < rightIndex (1 < 6)
// SR w leftIndex = index (1), rightIndex = rightIndex (6)
// arr.length > 1 (6 > 1)
// index = partition( [1,55,90,7,23,82,100], 1, 6 )
// pivot = arr[1] = 55
// i = leftIndex = 1
// j = rightIndex = 6
// i < j...
// arr[j] > pivot
// j = 5... 4
// i = 1
// j = 4
// i <= j
// swap arr[i] and arr[j] (55 and 23)
// [1,55,90,7,23,82,100] to [1,23,90,7,55,82,100]
// i++ return new i
// i < j... (2 < 4)
// arr[j] > pivot 
// 
