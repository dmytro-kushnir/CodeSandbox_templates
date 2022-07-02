import "./styles.css";
import Route from "./samples/iterator.mjs";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

function print(item) {
  console.log(item);
  document.getElementById("app").innerHTML += `\n<b>${item}</b></br>`;
}

const route = new Route(["london", "New York", "Paris"]);

for (let item of route) {
  print(item);
}

function* gen() {
  yield* route;

  return "x";
}

const g = gen();
print(JSON.stringify(g.next()));
print(JSON.stringify(g.next()));
print(JSON.stringify(g.next()));
print(JSON.stringify(g.next()));
print(JSON.stringify(g.next()));
