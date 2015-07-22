(function() {
    function DoublyLinkedList() {
        this.head = null;
    }

    DoublyLinkedList.prototype.push = function(val) {
        var node = {
            value: val,
            next: null,
            previous: null
        };

        if(!this.head) {
            this.head = node;
        }
        else {
            var current = this.head;
            while(current.next != null) {
                current = current.next;
            }
            current.next = node;
            node.previous = current;
        }
    };

    var sll = new DoublyLinkedList();
    sll.push(10);
    sll.push(20);
    sll.push(30);

    //Check values by traversing object
    console.log(sll.head);
    console.log(sll.head.next);
    console.log(sll.head.next.next);
})();