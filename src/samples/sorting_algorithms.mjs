export const sort_algorithms = {
  /*
  is the simplest sorting algorithm that works 
  by repeatedly swapping the adjacent elements if they are in the wrong order. 
  This algorithm is not suitable for large data sets as its average and worst-case 
  time complexity is quite high.
  https://www.geeksforgeeks.org/bubble-sort/
  */
  bubble_sort: (arr) => { // worst - O(n)^2
    for (let  i= 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] > arr[j+1]) {
          const temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
  
    return arr;
  },
  /*
    Quicksort is a fast sorting algorithm that works by splitting 
    a large array of data into smaller sub-arrays. This implies that each iteration works 
    by splitting the input into two components, sorting them, and then recombining them. 
    For big datasets, the technique is highly efficient since its average 
    and best-case complexity is O(n*logn).
    https://towardsdatascience.com/an-overview-of-quicksort-algorithm-b9144e314a72#:~:text=Quicksort%20is%20a%20fast%20sorting,them%2C%20and%20then%20recombining%20them.
  */
  quick_sort: (arr) => {
    if (arr?.length <= 1) {
      return arr;
    }
    var randomPlace = Math.floor(Math.random() * arr.length);
    const pivot = arr[randomPlace];
    
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
      (arr[i] < pivot ? left : right).push(arr[i]);
    }

    // prevent looping forever
    if (!left.length && right.every((v) => v === pivot)) {
      return right;
    }

    if (left.length <= 1 && right.length <= 1) {
        return left.concat(right);
    }
    if (left.length <= 1) {
        return left.concat(sort_algorithms.quick_sort(right));
    }
    if (right.length <= 1) {
        return sort_algorithms.quick_sort(left).concat(right);
    }

    return sort_algorithms.quick_sort(left).concat(sort_algorithms.quick_sort(right));
  },
  /*
  For merge sort, your goal is to split your array in half, 
  and extend into each of these new arrays to do the same until only one item 
  is left in the current array. When only 1 item exists, you've reached the condition 
  in which you pull back (return) and unite your arrays! 
  Now this return is just the start, you've told this path along the tree that it's time to unite. 
  What comes next is the logic on what to do with this data as
  it's pulled back into the original tree node.
  */
  merge_sort: (arr) => {
    if (arr?.length === 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const lh = sort_algorithms.merge_sort(arr.slice(0, arr.length - mid)); // left half
    const rh = sort_algorithms.merge_sort(arr.slice(0 - mid)); // right half
  
    let lh_i = 0;
    let rh_i = 0;
    return arr.map(v => /* loop over the original unsorted array at this branch 
        (how it appeared before the recursive split) and set to a new sorted value */
      !rh[rh_i] || lh[lh_i] < rh[rh_i]
        /* if right branch is undefined, get your data from the left
        otherwise, check which branch item is smaller at its current iterator
        (if the left branch is undefined, the comparison will always be false) */
        ? lh[lh_i++] // insert from the left branch, then increase the iterator
        : rh[rh_i++] // insert from the right branch, then increase the iterator
    )
  },
  /*
  Insertion sort is one of the most simplest sorting algorithm which sorts the elements 
  by arranging the most smallest at first place, second smallest at second place and so on
  https://www.geeksforgeeks.org/recursive-insertion-sort/
  */
  insertion_sort: (arr, i = arr.length) => {
    if (i <= 1) {
      return null;
    }
  
    sort_algorithms.insertion_sort(arr, i - 1);
    let last = arr[i - 1];
    let j = i - 2;
  
    while (j >= 0 && arr[j] > last) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = last;

    return arr;
    /*
    We are calling the same function recursively for (n – 1) elements and in each call we are iterating for all the elements
     less than the current index, so Time complexity is O(n * n).
    
     As we are calling the function recursively for (n – 1) elements,
     It will be stored in the call stack, so Space complexity is O(n).
    */
  }
 }

 export default sort_algorithms;