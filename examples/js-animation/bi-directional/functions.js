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

function moveDiv(obj, distance, duration) {
    if(!distance) {
        distance = 250; // in pixels
    }
    if(!duration) {
        speed = 500; // in milliseconds
    }

    if(!obj.style.marginLeft) {
        obj.style.marginLeft = 0 + 'px';
    }

    var timer = null,
        startTime = +new Date,
        elapsedTime = null,
        delta = null,
        dir = 'right';

    if(distance < obj.style.marginLeft.replace('px', '')) {
        dir = 'left';
    }

    timer = setInterval(function() {
        elapsedTime = +new Date - startTime;

        if(elapsedTime >= duration) {
            // Stop the animation
            // clearInterval(timer);
            obj.style.marginLeft = distance + 'px';
        }
        else if(elapsedTime) {
            
        }
        else {
            // Do the animation
            delta = (elapsedTime / duration) * distance;
            if(dir === 'right') {
                // delta = (elapsedTime / duration) * distance;
                // delta = (distance * 5) / duration;
                obj.style.marginLeft = delta + 'px';
                console.log(delta);
            }
            else {
                obj.style.marginRight = delta + 'px';
                console.log(delta);
            }
        }
    }, 5);
}