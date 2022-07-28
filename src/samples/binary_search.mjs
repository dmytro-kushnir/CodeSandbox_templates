import sort_algorithms from "./sorting_algorithms.mjs";

export default function binary_search_ordinary(list, item) {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = list[mid];
    if (guess === item) {
      return mid;
    }
    if (guess > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return null;
}

const binary_search_ordinary_recursive = (arr = [], searchItem, start = 0, end = arr.length - 1) => {
  if (!searchItem) {
    return null;
  }
  const middle = Math.floor((start + end) / 2);

  if (searchItem === arr[middle]) {
    return middle;
  }

  if (start >= end) {
    return null;
  }

  return searchItem < arr[middle]
    ? binary_search_ordinary_recursive(arr, searchItem, start, middle - 1)
    : binary_search_ordinary_recursive(arr, searchItem, middle + 1, end);
}


(() => {
  const arr_unsorted = [10, 5, 1, 3, 7, 1, 9, 25, 4, 6, 1231, 2, 5];

  console.time("timer_bubble");
  let arr_sorted = sort_algorithms['bubble_sort'](arr_unsorted);
  console.log(`arr sorted with bubble sort: ${arr_sorted}`);
  console.timeEnd("timer_bubble");

   console.time("timer_quick");
  arr_sorted = sort_algorithms['quick_sort'](arr_unsorted);
  console.log(`arr sorted with quick sort: ${arr_sorted}`);
  console.timeEnd("timer_quick");

  console.time("timer_merge");
  arr_sorted = sort_algorithms['merge_sort'](arr_unsorted);
  console.log(`arr sorted with merge sort: ${arr_sorted}`);
  console.timeEnd("timer_merge");

  console.time("timer_insertion_sort");
  arr_sorted = sort_algorithms['insertion_sort'](arr_unsorted);
  console.log(`arr sorted with insertion sort: ${arr_sorted}`);
  console.timeEnd("timer_insertion_sort");

  console.time("chrom_native_timsort");
  arr_sorted = arr_unsorted.sort((a, b) => a - b);
  console.log(`arr sorted with merge sort: ${arr_sorted}`);
  console.timeEnd("chrom_native_timsort");

  console.time("binary_search_ordinary");
  console.log('ordinary BS ', binary_search_ordinary(arr_sorted, 1));
  console.timeEnd("binary_search_ordinary");

  console.time("binary_search_ordinary_recursive");
  console.log('recursive BS', binary_search_ordinary_recursive(arr_sorted, 1)); 
  console.timeEnd("binary_search_ordinary_recursive");
})()