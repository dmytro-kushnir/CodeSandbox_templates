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


class Collection {
  // or we can create simple generator function: *getIterator() {...} instead
  // but then below: let value of myCollection.getIterator()

  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}


(() => {
  for (const n of range_iterator(0, 100, 5)) {
    console.log('!!! range', n);
  }

  const myCollection = new Collection();
  myCollection[0] = 1;
  myCollection[1] = 3;
  for(let value of myCollection) {
      console.log(value); // 1, then 2
  }
})()
