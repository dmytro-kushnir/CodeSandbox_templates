import { print }  from "../utils"

export default class Route {
  stations;

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
  _route;
  _nextIdx;

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

(() => {
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
})()