const modalInstance = (function() {
  top._modalInstance = top._modalInstance || {
    stack: [],

    add: function add(current) {
      return this.stack.push(current);
    },

    close: function close(reason) {
      this.stack.pop().close().resolve(reason);
    },

    dismiss: function dismiss(reason) {
      this.stack.pop().close().reject(reason);
    }
  };

  return top._modalInstance;
})();

const modal = (function(body) {
  function open(settings) {
    const url = settings.url;
    const title = settings.title || 'Info';
    const width = settings.width || '500px';

    const anchor = document.createElement('a');
    anchor.innerHTML = '&times;';
    anchor.className = 'modalClose';
    anchor.onclick = function() {
      modalInstance.dismiss();
    };

    const header = document.createElement('h2');
    header.appendChild(document.createTextNode(title));
    header.className = 'modalTitle';

    const loader = document.createElement('div');
    loader.className = 'modalLoader';
    loader.appendChild(document.createElement('div'));

    const frame = document.createElement('iframe');
    frame.src = url;
    frame.frameBorder = 0;
    frame.style.display = 'none';
    frame.style.width = '100%';
    frame.onload = function() {
      loader.style.display = 'none';
      frame.style.display = 'block';
    };

    const content = document.createElement('div');
    content.style.width = width;
    content.appendChild(anchor);
    content.appendChild(header);
    content.appendChild(loader);
    content.appendChild(frame);

    const backdrop = document.createElement('div');
    backdrop.className = 'modalBackdrop';
    backdrop.appendChild(content);
    body.appendChild(backdrop);

    return new Promise(function(resolve, reject) {
      modalInstance.add({
        resolve: resolve,
        reject: reject,
        close: function() {
          body.removeChild(backdrop);
          return this;
        }
      });
    });
  };

  return {
    open: open
  };
})(top.document.body);
