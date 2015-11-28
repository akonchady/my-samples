var dragDrop = (function() {
    function dragDrop(container, callback) {
        var dragObject = null,
            mouseOffset;

        container.addEventListener('mousemove', function mouseMove(event) {
            event = event || window.event;
            callback(mouseCoords(event));

            var mousePos = mouseCoords(event);

            if (dragObject) {
                dragObject.style.position = 'absolute';
                dragObject.style.top = mousePos.y - mouseOffset.y;
                dragObject.style.left = mousePos.x - mouseOffset.x;
                event.preventDefault();
            }
        });

        container.addEventListener('mouseup', function() {
            dragObject = null;
        });

        function makeClickable(object) {
            object.addEventListener('mousedown', function() {
                dragObject = this;
            });
        }

        function makeDraggable(item) {
            if (!item) {
                return;
            }
            item.addEventListener('mousedown', function(event) {
                dragObject = this;
                mouseOffset = getMouseOffset(this, event);
                event.preventDefault();
            });
        }

        //  If we have a 20x20px image and click in the middle, mouseOffset should be: {x:10, y:10}
        function getMouseOffset(target, event) {
            event = event || window.event;
            var mousePos = mouseCoords(event);
            var containerPos = getPosition(target); // Position w.r.t the container

            return {
                x: mousePos.x - containerPos.x,
                y: mousePos.y - containerPos.y
            };
        }

        function getPosition(element) {
            var left = 0,
                top = 0;

            while (element.offsetParent) {
                left += element.offsetLeft;
                top += element.offsetTop;
                element = element.offsetParent;
            }
            left += element.offsetLeft;
            top += element.offsetTop;

            return {
                x: left,
                y: top
            };
        }

        function mouseCoords(event) {
            if (event.pageX || event.pageY) {
                return {
                    x: event.pageX,
                    y: event.pageY
                };
            }
            return {
                x: event.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: event.clientY + document.body.scrollTop - document.body.clientTop
            };
        }
    };

    return dragDrop;
})();