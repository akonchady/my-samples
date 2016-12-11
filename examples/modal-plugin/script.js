/*
 Reference: https://scotch.io/tutorials/building-your-own-javascript-modal-plugin
 */

(function() {
    this.Modal = function() {

        // Global element references
        this.closeButton = null;
        this.modal = null;
        this.overlay = null;

        // Define option defaults
        var defaults = {
            className: 'fade-and-drop',
            closeButton: true,
            content: "",
            maxWidth: 600,
            minWidth: 280,
            overlay: true
        };

        if(arguments[0] && typeof arguments[0] === 'object') {
            this.options = extendDefaults(defaults, arguments[0]);
        }


    }

    // Public methods
    Modal.prototype.open = function() {
        // Build out our Modal
        buildOut.call(this);

        // Initialize our event listeners
        initializeEvents.call(this);

        /*
         After adding elements to the DOM, use getComputedStyle
         to force the browser to recalc and recognize the elements
         that we just added. This is so that the CSS animation has a start point
         */
        window.getComputedStyle(this.modal).height;

        /*
         Add our open class and check if the modal is taller than the window.
         If so, our anchored class is also applied.
         */
        this.modal.className = this.modal.className +
            (this.modal.offsetHeight > window.innerHeight ?
                ' scotch-open scotch-anchored' : 'scotch-open');

        this.overlay.className = this.overlay.className + ' scotch-open';
    }

    function buildOut() {
        var content, contentHolder, docFrag;

        if(typeof this.options.content === 'string') {
            content = this.options.content;
        }
        else {
            // if content is DOMNode, append its content
            content = this.options.content.innerHTML;
        }

        // Create a document fragment
        var docFrag = document.createDocumentFragment();

        // Create modal element
        this.modal = document.createElement('div');
        this.modal.className = 'scotch-modal ' + this.options.className;
        this.modal.style.minWidth = this.options.minWidth + 'px';
        this.modal.style.maxWidth = this.options.maxWidth + 'px';

        // If closeButton options is true, add a close button
        if(this.options.closeButton === true) {
            this.closeButton = document.createElement('button');
            this.closeButton.className = 'scotch-close close-button';
            this.closeButton.innerHTML = 'x';
            this.modal.appendChild(this.closeButton);
        }

        // If overlay is true, add one
        if(this.options.overlay === true) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'scotch-overlay ' + this.options.className;
            docFrag.appendChild(this.overlay);
        }

        // Create content area and append to modal
        contentHolder = document.createElement('div');
        contentHolder.className = 'scotch-content';
        contentHolder.innerHTML = content;
        this.modal.appendChild(contentHolder);

        // Append modal to DocumentFragment
        docFrag.appendChild(this.modal);

        // Append DocumentFragment to body
        document.body.appendChild(docFrag);

    }

    function extendDefaults(dest, src) {
        for(var prop in src) {
            if(src.hasOwnProperty(prop)) {
                dest[prop] = src[prop];
            }
        }
        return dest;
    }

    function initializeEvents() {
        if(this.closeButton) {
            this.closeButton.addEventListener('click', this.close.bind(this));
        }

        if(this.overlay) {
            this.overlay.addEventListener('click', this.close.bind(this));
        }
    }
})();

var myModal = new Modal({
    content: 'Howdy',
    width: 600
});