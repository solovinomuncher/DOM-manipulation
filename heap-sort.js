// ====================================================
// fundamental sort algorithms: heap sort implementation
// ====================================================

// TERMINOLOGY
// COMPLETE BINARY TREE = tree w nodes filled in correct order (left to right, ad infinum)
// FULL BINARY TREE = tree w all nodes filled, including children
// MAX HEAP = complete binary tree where every parent node is greater than all its descendants
// MIN HEAP = complete binary tree where every parent node is smaller than all its descendants

// REPRESENTING HEAP IN ARRAY
// if given node is at i,
// parent node is at floor of (i-1) / 2
// left node is at (2*i) + 1
// right node is at (2*i) + 2

// STEPS
// 1. build a "heap" (or complete binary tree) using given elements (start to end)
// - binary tree, two children per parent, fill from left to right
// 2. transform "heap" into "max heap" (or min heap) by sorting the elements in ascending order
// - parent node always greater (or less) than or equal to child nodes
// - insert -> sort to max heap -> insert -> sort to max heap -> etc until all elements added
// 3. swap root node with last node and delete last node from heap
// - deleted node indicates an already properly sorted element
// 4. repeat 2 and 3 until there are no more elements in heap
// - indicates all elements properly sorted

// time it takes to insert 1 element in a heap is min O(1) and max O(log n)
// time it takes to delete 1 element in a heap is max O(log n)

// Math.floor returns largest INTEGER less than or equal to given number

class MaxHeap {
    constructor() {
        this.heap = []
    }

    // finding index of parent and children of given node
    parentIndex(index) {
        return Math.floor((index-1)/2)
    }

    leftChildIndex(index) {
        return (2*index + 1)
    }

    rightChildIndex(index) {
        return (2*index + 2)
    }

    // used a lot in following methods, so included here (DRY)
    swap(a,b) {
        let temp = this.heap[a]
        this.heap[a] = this.heap[b]
        this.heap[b] = temp
    }

    // swapping elements if given index is larger than parent (and moving to above level)
    insert(item) {
        this.heap.push(item) 
        // adds given item to end of array
        console.log(`added item to heap: ${this.heap}`)

        let index = this.heap.length - 1 
        // index is index of last element of heap (the inserted item)

        let parent = this.parentIndex(index)
        // parent is index of the parent of last element of heap (the inserted item) 

        console.log(`parent = ${this.heap[parent]}`)
        console.log(`child = ${this.heap[index]}`)
        console.log(`does parent exist? ${this.heap[parent]}`)

        while (this.heap[parent] && this.heap[parent] < this.heap[index]) {
            // while parent element exists and parent element is less than inserted item
            console.log(`is parent less than child? ${this.heap[parent] < this.heap[index]}`)
            
            console.log(`pre-swap heap is ${this.heap}`)
            this.swap(parent, index)
            // swap the two elements' values
            console.log(`post-swap heap is ${this.heap}`)

            console.log(`pre-index is ${index}`)
            index = this.parentIndex(index)
            // reassign index of last element of heap to index of parent
            console.log(`post-index is ${index}`)

            console.log(`pre-parent is ${parent}`)
            parent = this.parentIndex(index)
            // reassign index of parent to 0?
            console.log(`post-parent is ${parent}`)
        }

        console.log('insert terminated')
    }

    // removes largest element (first elem in array), adds last element in array to first
    // creates pointers to two children for new first elem
    delete() {
        console.log(this.heap)
        let item = this.heap.shift()
        // item is first item of heap, removed from heap

        this.heap.unshift(this.heap.pop())
        // adds last item of heap where first item was
        console.log(this.heap)

        let index = 0
        // index is 0, first element of heap

        let leftChild = this.leftChildIndex(index)
        // index of left child of first element in heap

        let rightChild = this.rightChildIndex(index)
        // index of right child of first element in heap

        console.log(`parent: ${this.heap[index]}`)
        console.log(`left child: ${this.heap[leftChild]}`)
        console.log(`right child: ${this.heap[rightChild]}`)
        while (this.heap[leftChild] && this.heap[leftChild] > this.heap[index] || this.heap[rightChild] > this.heap[index]) {
            // while left child exists and left child is greater than first element OR right child is greater that first element
            console.log('left or right child larger than parent')
            let max = leftChild
            console.log('default left is bigger')
            if (this.heap[rightChild] && this.heap[rightChild] > this.heap[max]) {
                // if right child exists and right child is greater than left child
                max = rightChild
                // max becomes right child
                console.log('nope, right is bigger')
            }
            this.swap(max, index)
            // swap the max and index?
            console.log('switch parent and bigger child')
            console.log(this.heap)
            index = max
            // index is now max?
            leftChild = this.leftChildIndex(max)
            rightChild = this.rightChildIndex(max)
        }
        console.log('delete terminated')
        return item
    }
}

function heapSort(arr) {
    let sorted = []
    let heap1 = new MaxHeap()

    console.log('CREATING HEAP')
    // create heap from given array (using insert helper)
    for (let i = 0; i < arr.length; i++) {
        heap1.insert(arr[i])
        console.log(heap1['heap'])
    }
    console.log(`FINAL HEAP: ${heap1['heap']}`)

    console.log('REMOVING FROM HEAP AND ADDING TO SORTED')
    // delete from heap one by one, adding deleted to array sorted (using delete helper & push)
    for (let i = 0; i < arr.length; i++) {
        sorted.unshift(heap1.delete()) // alt is push for max-to-min array
        // console.log(heap1['heap'])
        console.log(`new sorted = ${sorted}`)
    }

    return sorted
}

let arr1 = [1,55,90,7,23,82,100]
console.log(heapSort(arr1))