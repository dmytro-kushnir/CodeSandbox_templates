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
  } while (i % 1e3 !== 0);

  if (i < 1e7) {
    /*
      setTimeout() executes in the WebAPI, then sends the callback to an event queue and 
      allows the event loop to repaint before pushing it’s callback into the JavaScript call stack.
    */

    // timeout is about 4ms
    setTimeout(count);
  }
}

document.getElementById("button").addEventListener("click", () => {
  count();
});
