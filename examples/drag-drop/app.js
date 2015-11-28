(function() {
    var posObj = {
        x: document.getElementById('mouseXPos'),
        y: document.getElementById('mouseYPos')
    };
    dragDrop(document, function(mousePos) {
        posObj.x.value = mousePos.x;
        posObj.y.value = mousePos.y;
    });
})();