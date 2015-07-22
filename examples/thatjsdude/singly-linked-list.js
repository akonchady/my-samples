(function() {
    function LinkedList() {
        this.head = null;
    }

    LinkedList.prototype.push = function(val) {
        var node = {
            value: val,
            next: null
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
        }
    };

    LinkedList.prototype.remove = function(val) {
        var current = this.head, previous = null;

        /*if(current.value == val) {
            this.head = this.head.next;
            return;
        }
        else {
            var previous;
            while(current.next) {

                previous = current;
                current = current.next;
            }
        }*/
        while(current.next) {
            if(current.value == val) {
                if(this.head == current) {
                    this.head = current.next;
                    break;
                }
                else {
                    previous.next = current.next;
                    delete current;
                }
            }
        }
    }

    var sll = new LinkedList();
    sll.push(10);
    sll.push(20);
    sll.push(30);

    //Check values by traversing object
    console.log(sll.head);
    console.log(sll.head.next);
    console.log(sll.head.next.next);
})();