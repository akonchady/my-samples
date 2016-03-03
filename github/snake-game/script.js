var JS_SNAKE = {};

JS_SNAKE.game = (function () {
    var ctx,
        frameLength = 100, // new frame every 0.5 seconds
        snake;
    JS_SNAKE.width = 200;
    JS_SNAKE.height = 200;
    JS_SNAKE.blockSize = 10;

    function init() {
        $('body').append('<canvas id="jsSnake">'); // create the canvas element
        var $canvas = $('#jsSnake');
        $canvas.attr('width', 100).attr('height', 100);
        var canvas = $canvas[0]; // get the actual dom element
        ctx = canvas.getContext('2d'); // get the context
        snake = JS_SNAKE.snake();
        bindEvents();
        gameLoop();
    }

    function bindEvents() {
        var keysToDirection = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        $(document).keydown(function(event) {
            var key = event.which;
            var direction = keysToDirection[key];

            if(direction) {
                snake.setDirection(direction);
                event.preventDefault();
            }
            else if(key === 32) {
                restart();
            }
        });
    }

    function gameLoop() {
        ctx.clearRect(0, 0, JS_SNAKE.width, JS_SNAKE.height); // clear the canvas
        snake.advance();
        snake.draw(ctx);
        setTimeout(gameLoop, frameLength); // do it all again
    }

    return {
        init: init
    }
})();

JS_SNAKE.snake = function() {
    var posArray = [];
    posArray.push([6, 4]);
    posArray.push([5, 4]);
    posArray.push([4, 4]);
    var direction = 'right';
    var nextDirection = direction;

    function setDirection(newDirection) {
        var allowedDirections;

        // If snake is going left or right, only valid new directions are up and down.
        // Vice versa for up or down.
        switch (direction) {
            case 'left':
            case 'right':
                allowedDirections = ['up', 'down'];
                break;

            case 'up':
            case 'down':
                allowedDirections = ['left', 'right'];
                break;

            default:
                throw('Invalid direction');
        }

        if (allowedDirections.indexOf(newDirection) > -1) {
            nextDirection = newDirection;
        }
    }

    function drawSection(ctx, position) {
        var x = JS_SNAKE.blockSize * position[0];
        var y = JS_SNAKE.blockSize * position[1];
        ctx.fillRect(x, y, JS_SNAKE.blockSize, JS_SNAKE.blockSize);
    }

    function draw(ctx) {
        ctx.save();
        ctx.fillStyle = '#33a';
        for(var i=0;i<posArray.length;i++) {
            drawSection(ctx,posArray[i]);
        }
        ctx.restore();
    }

    function advance() {
        var nextPosition = posArray[0].slice(); // copy head of snake
        nextPosition[0] += 1; // add 1 to the x position

        // add the new position to the beginning of the array
        posArray.unshift(nextPosition);

        // and remove the last position
        posArray.pop();
    }

    return {
        draw: draw,
        advance: advance,
        setDirection: setDirection
    }
}

$(document).ready(function() {
    JS_SNAKE.game.init();
});

