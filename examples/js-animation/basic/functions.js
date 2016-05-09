function addEvent(obj, event, fn, capture) {
    event = event.replace('on', '');
    if(obj.attachEvent) {
        obj.attachEvent('on' + event, fn);
    }
    else {
        if(!capture) {
            capture = false;
            obj.addEventListener(event, fn, capture);
        }
    }
}

/*
 * position animation with javascript
 Write a function animate, which takes element, and new width and it should update the css
 */

function animate(id, styleAttr, finalValue, duration, callback) {
    var ele = document.getElementById(id),
        startTime = +new Date,
        delta = null,
        req = null;

    (function timeout() {
        elapsedTime = +new Date - startTime;

        if(elapsedTime >= duration) {
            cancelAnimationFrame(req);
            ele.style[styleAttr] = finalValue + 'px';
            if(typeof callback !== 'undefined') {
                callback();
            }
            return;
        }
        else {
            // moveVal = elapsedTime/duration * finalValue;
            // speed = distance / time
            delta = finalValue / duration;
            ele.style[styleAttr] = delta * elapsedTime + 'px';
        }

        req = requestAnimationFrame(timeout);
    })();
}

animate('box', 'marginLeft', 250, 1000, function() {
    animate('box', 'marginTop', 250, 1000, function() {
        
    });
});

/*0px 200px 10s
 (200 - 0) / 10 -> 20 (moveVal)*/

// Refer: https://www.youtube.com/watch?v=F_iFYZDht6Q