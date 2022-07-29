
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
    // setTimeout(count, 0); // time for all operation: 3824-4300 ms
    nextTick(count); // time for all operation: 3769-4200 ms
    // queueMicrotask(count); // time for all operation: 592 ms but freezes the UI since Microtask queue is not empty
  } else {
    console.timeEnd("timer");
  }
}

(() => {
  document.getElementById("button").addEventListener("click", () => {
    console.time("timer");
    count();
  });
})()

const nextTick = (function () {
  var canSetImmediate = typeof window !== "undefined" && window.setImmediate;
  var canPost =
    typeof window !== "undefined" &&
    window.postMessage &&
    window.addEventListener;
  if (canSetImmediate) {
    console.log("I can canSetImmediate", true);
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
