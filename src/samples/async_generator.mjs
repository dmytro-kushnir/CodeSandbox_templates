/* 
  “polyfill” to instantiate the generator, 
  recursively nesting next for each yield statement inside its Promise’s then callback until done is true. 
  In other words, when each Promise resolves, its value will be passed as an argument to next,
  whereby g.next will replace its corresponding yield statement with that value.
*/

export default function async (generator) {
  return new Promise((resolve, reject) => {
    const g = generator();
    (function nextFunc(nextValue) {
      const r = g.next(nextValue);
      console.log('1 ', r)
      console.log('2', nextValue);

      if (r.done) {
        console.log('RESOLVED!')
        return resolve(r.value);
      }
      r.value.then(nextFunc);
    }());
  });
}

(() => {
  async(function*() {
      try {
        const rsp = yield fetch('https://api.github.com/users/dmytro-kushnir/repos');
        console.log("FINAL", rsp)
        const data = yield rsp.json();
        console.log("DATA", data); 
      } catch (e) {
        console.error(e);
      }
  })
})() 
