import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

class Route {
  #stations;

  constructor(stations) {
    this.stations = stations;
  }

  get(idx) {
    return this.stations[idx];
  }

  [Symbol.iterator]() {
    return new RouteIterator(this);
  }
}

class RouteIterator {
  #_route;
  #_nextIdx;

  constructor(route) {
    this._route = route;
    this._nextIdx = 0;
  }

  next() {
    if (this._nextIdx === this._route.stations.length) {
      return { done: true };
    }

    const result = {
      value: this._route.get(this._nextIdx),
      done: false
    };

    this._nextIdx++;

    return result;
  }
}

const route = new Route(["london", "New York", "Paris"]);

for (let item of route) {
  print(item);
}

function print(item) {
  console.log(item);
  document.getElementById("app").innerHTML += `\n<b>${item}</b>`;
}
