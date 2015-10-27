"use strict";

let store = {};
let ports = [];

onconnect = connEvent => {

  ports.push(connEvent.ports[0]);
  connEvent.ports[0].onmessage = e => {
    if(e.data !== null) {
      if(typeof(e.data) === 'object') {
        for(let key in e.data) {
          store[key] = e.data[key];
        }
      }
    }
    ports.forEach(port => {
      port.postMessage(store);
    });
  };

};
