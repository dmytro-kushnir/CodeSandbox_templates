import "./styles.css";
// import Route from "./samples/iterator_class.mjs";
// import BST_Iterator from "./samples/bst_traverse.mjs";
// import async from "./samples/async_generator.mjs";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

let i = 0;
function count() {
  do {
    i++;
    document.getElementById("app").innerHTML = i;
  } while (i % 1e3 !== 0); // batch of 1000 elements

  if (i < 1e5) {
    /*
      setTimeout() executes in the WebAPI, then sends the callback to an event queue and 
      allows the event loop to repaint before pushing it’s callback into the JavaScript call stack.
    */
    // timeout is about 4ms
    setTimeout(count); // time for all operation: 3824-4300 ms
    // nextTick(count); // time for all operation: 3769-4200 ms
  } else {
    console.timeEnd("timer");
  }
}

document.getElementById("button").addEventListener("click", () => {
  console.time("timer");
  count();
});

const nextTick = (function () {
  var canSetImmediate = typeof window !== "undefined" && window.setImmediate;
  var canPost =
    typeof window !== "undefined" &&
    window.postMessage &&
    window.addEventListener;
  if (canSetImmediate) {
    console.log("!", true);
    return function (f) {
      return window.setImmediate(f);
    };
  }
  if (canPost) {
    console.log("postMessage");
    var queue = [];
    window.addEventListener(
      "message",
      function (ev) {
        var source = ev.source;
        if (
          (source === window || source === null) &&
          ev.data === "process-tick"
        ) {
          ev.stopPropagation();
          if (queue.length > 0) {
            var fn = queue.shift();
            fn();
          }
        }
      },
      true
    );
    return function nextTick(fn) {
      queue.push(fn);
      window.postMessage("process-tick", "*");
    };
  }
  console.log("setTiemout");
  return function nextTick(fn) {
    setTimeout(fn, 0);
  };
})();
