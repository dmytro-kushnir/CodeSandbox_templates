export default function range_iterator(start, end, step = 1) {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (start < end) {
        start = start + step;
        return { value: start, done: false };
      }
      return {
        done: true,
        value: end,
      };
    },
  };
}

(() => {
  for (const n of range_iterator(0, 100, 5)) {
    console.log('!!! range', n);
  }
})()
