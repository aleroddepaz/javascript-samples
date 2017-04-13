var modalInstance = (function() {
  top._modalInstance = top._modalInstance || {
    _stack: [],

    add: function add(current) {
      return this._stack.push(current);
    },

    close: function close(reason) {
      var current = this._stack.pop();
      current.close();
      current.resolve(reason);
    },

    dismiss: function dismiss(reason) {
      var current = this._stack.pop();
      current.close();
      current.reject(reason);
    }
  };

  return top._modalInstance;
})();

var modal = (function(body) {
  function open(settings) {
    var url = settings.url;
    var title = settings.title || 'Info';
    var width = settings.width || '500px';

    var anchor = document.createElement('a');
    anchor.innerHTML = '&times;';
    anchor.className = 'modalClose';
    anchor.onclick = function() {
      modalInstance.dismiss();
    };

    var header = document.createElement('h2');
    header.appendChild(document.createTextNode(title));
    header.className = 'modalTitle';

    var loader = document.createElement('div');
    loader.className = 'modalLoader';
    loader.appendChild(document.createElement('div'));

    var frame = document.createElement('iframe');
    frame.src = url;
    frame.frameBorder = 0;
    frame.style.display = 'none';
    frame.style.width = '100%';
    frame.onload = function() {
      loader.style.display = 'none';
      frame.style.display = 'block';
    };

    var content = document.createElement('div');
    content.style.width = width;
    content.appendChild(anchor);
    content.appendChild(header);
    content.appendChild(loader);
    content.appendChild(frame);

    var backdrop = document.createElement('div');
    backdrop.className = 'modalBackdrop';
    backdrop.appendChild(content);
    body.appendChild(backdrop);

    return new Promise(function(resolve, reject) {
      modalInstance.add({
        resolve: resolve,
        reject: reject,
        close: () => body.removeChild(backdrop)
      });
    });
  };
  
  return {
    open: open
  };
})(top.document.body);
