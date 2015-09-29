let message = undefined;

self.addEventListener('connect', e => {

  let port = e.ports[0];

  port.addEventListener('message', e => {
    if(e.data !== null) {
      message = e.data;
    }
    port.postMessage(message);
  }, false);

  port.start();

}, false);
