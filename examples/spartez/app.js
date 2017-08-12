function initiateMadness() {
  var sparta = {
    name : "Sparta"
  };

  function madness() {
    alert("THIS. IS. " + this.name.toUpperCase() + ".");
  }

  document.onclick = makeAMessenger(madness, sparta);
}

initiateMadness();

function makeAMessenger(func, context) {
  /*
     We use the call operation to change the binding of 'this' object at runtime
   */
  return function () {
    func.call(context);
  }
}

// We can use a debouncing function to achieve this behavior.
function debounce(fn, delay) {
  var timeout = null;
  
  return function() {
    var context = this, args = arguments;

    function callback() {
      fn.apply(context, args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  }
}

var handleScroll = function() {
  console.log('scrolling');
};

var debounceFn = debounce(handleScroll, 200);

$(window).scroll(debounceFn);

// $(document).on('mouseenter', '.user', fnShowUserHover);
$(".user").bind("mouseenter", fnShowUserHover);

function fnShowUserHover() {
  console.log('user hovered');
}