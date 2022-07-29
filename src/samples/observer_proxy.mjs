/*
Thankfully, Proxy actually makes specs like Object.observe redundant,
as now we have a low level API through Proxy, we can actually implement
something like Object.observe. To get close feature parity with Object.observe,
we need to hook on the [[Set]], [[PreventExtensions]], [[Delete]], and [[DefineOwnProperty]] internal methods - that’s the set, preventExtensions, deleteProperty and defineProperty 
Proxy traps respectively:
*/
export default function observe(object, observerCallback) {
  let observing = true;
  const proxyObject = new Proxy(object, {
    set: function (object, property, value) {
      const hadProperty = Reflect.has(object, property);
      const oldValue = hadProperty && Reflect.get(object, property);
      const returnValue = Reflect.set(object, property, value);

      if (observing && hadProperty) {
        observerCallback({ object: proxyObject, type: 'update', name: property, oldValue: oldValue });
      } else if(observing) {
        observerCallback({ object: proxyObject, type: 'add', name: property });
      }

      return returnValue;
    },
    deleteProperty: function (object, property) {
      const hadProperty = Reflect.has(object, property);
      const oldValue = hadProperty && Reflect.get(object, property);
      const returnValue = Reflect.deleteProperty(object, property);
  
      if (observing && hadProperty) {
        observerCallback({ object: proxyObject, type: 'delete', name: property, oldValue: oldValue });
      }

      return returnValue;
    },
    defineProperty: function (object, property, descriptor) {
      const hadProperty = Reflect.has(object, property);
      const oldValue = hadProperty && Reflect.getOwnPropertyDescriptor(object, property);
      const returnValue = Reflect.defineProperty(object, property, descriptor);

      if (observing && hadProperty) {
        observerCallback({ object: proxyObject, type: 'reconfigure', name: property, oldValue: oldValue });
      } else if (observing) {
        observerCallback({ object: proxyObject, type: 'add', name: property });
      }

      return returnValue;
    },
    preventExtensions: function (object) {
      const returnValue = Reflect.preventExtensions(object);

      if (observing) {
        observerCallback({ object: proxyObject, type: 'preventExtensions' })
      }

      return returnValue;
    },
  });

  return { 
    object: proxyObject,
    unobserve: () => observing = false
  };
}


// more lightweight scenario
const proxied = new Proxy({
  foo: 1,
  bar: '2'
}, {
  get: (target, prop) => {
    console.log({ type: 'get', target, prop });
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    console.log({ type: 'set', target, prop, value });
    return Reflect.set(target, prop, value);
  },
});

(() => {
  var changes = [];
  const { object, unobserve } 
    = observe({ id: 1 }, (change) => changes.push(change));

  object.a = 'b';
  object.id++;
  Object.defineProperty(object, 'a', { enumerable: false });
  delete object.a;
  Object.preventExtensions(object);
  unobserve();
  object.id++;

  console.log ('!! changes ', changes);
  ///
  proxied.bar = 1;
  proxied.foo = 21;
  proxied.bar = proxied.foo;
})()