(function() {
  $ = function(selector) {
    if(!(this instanceof $)) {
      return new $(selector);
    }

    var elements;
    if(typeof selector === 'string') {
      elements = document.querySelectorAll(selector);
    }
    else {
      elements = selector;
    }

   /* var count = 0;
    $.each(elements, function(index, value) {
      this[count++] = value;
    });
    this.length = count;*/

    Array.prototype.push.apply(this, elements);

    return this;
  };

  $.extend = function(target, object) {

    for(var prop in object) {
      if(object.hasOwnProperty(prop)) {
        target[prop] = object[prop];
      }
    }
    return target;
  };

  // Static methods
  var isArrayLike = function(obj) {
    if(typeof obj.length === 'number') {
      if(obj.length === 0) {
        return true;
      }
      else if(obj.length > 0) {
        return (obj.length-1) in obj;
      }
    }
    return false;
  };

  var getText = function(element) {
    // Should return the combined text of all the child nodes

    var txt = "";
    $.each(element.childNodes, function(index, childNode) {
      if(childNode.nodeType === Node.TEXT_NODE) {
        txt += childNode.nodeValue;
      }
      else {
        txt += getText(childNode);
      }
    });

    return txt;
  };

  $.extend($, {
    isArray: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    each: function(collection, cb) {
      if(isArrayLike(collection)) {
        for(var i=0;i<collection.length;i++) {
          var value = collection[i];
          cb.call(value, i, value);
        }
      }
      else {
        for(var prop in collection) {
          if(collection.hasOwnProperty(prop)) {
            var value = collection[prop];
            cb.call(value, prop, value);
          }
        }
      }
      return collection;
    },
    makeArray: function(arr) {
      // return Array.prototype.slice.call(arr);
      var array = [];
      $.each(arr, function(index, value) {
        array.push(value);
      });
      return array;
    },
    proxy: function(fn, context) {
      // return fn.bind(context);

      return function() {
        return fn.apply(context, arguments);
      }
    }
  });

  $.extend($.prototype, {
    html: function(newHtml) {
      if(arguments.length) {
        // Setting
        return $.each(this, function(index, element) {
          element.innerHTML = newHtml;
        });
      }
      else {
        // Getting
        return this[0] && this[0].innerHTML;
      }
    },
    val: function(newVal) {
      if(arguments.length) {
        $.each(this, function(index, element) {
          element.value = newVal;
        });
        return newVal;
      }
      else {
        return this[0] && this[0].value;
      }
    },
    text: function(newText) {
      if(arguments.length) {
        // Setter
        $.each(this, function (index, element) {
          element.innerHTML = "";
          var textNode = document.createTextNode(newText); // Cannot place this outside the 'each' loop cos otherwise it
                            // would place it only for the last node. We need to clone it otherwise.
          element.appendChild(textNode);
        });
      }
      else {
        // Getter
        // Should loop through all the child nodes and get the text nodes combined.
        return this[0] && getText(this[0]);
      }
    },
    find: function(selector) {
      // Syntax: $('ul').find('a'). So for each ul matched find a's within those ul tags.
      var elements = [];

      $.each(this, function(i, el) {
        var els = el.querySelectorAll(selector);
        Array.prototype.push.apply(elements, els);
      });

      return $(elements);
    },
    next: function() {
      // Accumulator
      var elements = [];

      $.each(this, function(i, el) {
        var current = el.nextSibling;

        while(current && current.nodeType !== 1) {
          current = current.nextSibling;
        }

        if(current) {
          elements.push(current);
        }
      });

      // Construct jquery object out of array to support chaining
      return $(elements);
    },
    prev: function() {
      var elements = [];

      $.each(this, function(i, el) {
        var previous = el.previousSibling;

        while(previous && previous.nodeType !== 1) {
          previous = previous.previousSibling;
        }

        if(previous) {
          elements.push(previous);
        }
      });

      return $(elements);
    },
    parent: function() {
      var elements = [];

      $.each(this, function(i, el) {
        elements.push(el.parentNode);
      });

      return $(elements);
    },
    children: function() {
      var elements = [];

      $.each(this, function(i, el) {
        elements.push(el.children);
      });

      return $(elements);
    },
    attr: function(attrName, value) {},
    css: function(cssPropName, value) {},
    width: function() {},
    offset: function() {
      var offset = this[0].getBoundingClientRect();
      return {
        top: offset.top + window.pageYOffset,
        left: offset.left + window.pageXOffset
      };
    },
    hide: function() {},
    show: function() {},

    // Events
    bind: function(eventName, handler) {},
    unbind: function(eventName, handler) {},
    has: function(selector) {
      var elements = [];

      $.each(this, function(i, el) {
        if(el.matches(selector)) {
          elements.push(el);
        }
      });

      return $( elements );
    },
    on: function(eventType, selector, handler) {
      return this.bind(eventType, function(ev){
        var cur = ev.target;
        do {
          if ($([ cur ]).has(selector).length) {
            handler.call(cur, ev);
          }
          cur = cur.parentNode;
        } while (cur && cur !== ev.currentTarget);
      });
    },
    off: function(eventType, selector, handler) {},
    data: function(propName, data) {},

    // Extra
    addClass: function(className) {},
    removeClass: function(className) {},
    append: function(element) {},
  });

  $.buildFragment = function(html) {};
})();