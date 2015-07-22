(function () {
    try {
        //event handler code added on window object to make the events compatible with mozilla and IE 
        if (document.addEventListener) {
            this.addEvent = function (elem, type, fn, context) {
                elem.self = context; // Context from which this function is invoked
                elem.addEventListener(type, fn, false);
                return fn;
            };
            this.removeEvent = function (elem, type, fn) {
                elem.self = null;
                elem.removeEventListener(type, fn, false);
            };
        }
        else {
            if (document.attachEvent) {
                this.addEvent = function (elem, type, fn, context) {
                    elem.self = context; // Context from which this function is invoked
                    var bound = function () {
                        return fn.apply(elem, arguments);
                    };
                    elem.attachEvent('on' + type, bound);
                    return bound;
                };

                this.removeEvent = function (elem, type, fn) {
                    elem.self = null;
                    var bound = function () {
                        return fn.apply(elem, arguments);
                    };
                    var result = elem.detachEvent('on' + type, bound);
                    return bound;
                };
            }
        }

        //Show an element
        this.show = function (element) {
            if(element) {
                element.style.display = 'block';
            }
            return element;
        };

        //Hide an element
        this.hide = function (element) {
            if(element) {
                element.style.display = 'none';
            }
            return element;
        };

        // Show the error Message for sometime.
        this.showErrorMessage = function (msg) {
            this.errorMessage.innerText = msg;
            this.errorMessage.innerHTML = msg;
            show(this.errorMessage);
            setTimeout(function () {
                this.errorMessage.innerText = "";
                this.errorMessage.innerHTML = "";
                hide(this.errorMessage);
            }, 1500);
        };

        //Toggle element display
        this.toggleElement = function(element, toggleElement) {
            toggleElement.style.display = 'none';
            addEvent(element, 'mouseenter', function() {
                show(toggleElement);
            });

            addEvent(element, 'mouseleave', function() {
                hide(toggleElement);
            });
            return element;
        };

        //Single instance of the card manager
        var cardManager = {
            createNewCard: document.getElementById('createNewCard'),
            resetData: document.getElementById('resetData'),
            cardDesc: document.getElementById('cardDesc'),
            addNewCardContainer: document.getElementById('addNewCardContainer'),
            initializeCardManager: function () {
                addEvent(this.createNewCard, 'click', this.createCard, this);
                addEvent(this.resetData, 'click', this.resetCardDesc, this);
            },
            createCard: function (event) {
                var card = new Card();
                card.addCard(this.self.cardDesc.value);
                this.self.cardDesc.value = "";
            },
            resetCardDesc: function (event) {
                this.self.cardDesc.value = "";
            }
        };

        //Each card will have its own instance
        function Card() {
            this.cardDesc = '';
            this.cardContainer = '';
        }

        //Adds a new card. These methods added to the prototype are common to all objects.
        Card.prototype.addCard = function (cardName) {
            if(!cardName) {
                showErrorMessage('Please enter the card header');
                return;
            }
            this.cardContainer = document.createElement('div');
            this.cardContainer.className = 'card-container';
            this.cardContainer.innerHTML = this.getNewCardTemplate(cardName);
            customSelector(document).querySelector(".container").insertBefore(this.cardContainer, cardManager.addNewCardContainer);

            //Store reference to add card textbox to be used later while clearing data
            this.cardDesc = customSelector(this.cardContainer).querySelector('.task-data');

            //new is not used because @ a time only one drag & drop is possible. So, its common for all.
            //dragDrop.init({ items: "card-task", listContainer: "card-items", exceptionList: [] }, customSelector(this.cardContainer).querySelector('.card-items'));

            //Attach events
            addEvent(customSelector(this.cardContainer).querySelector(".btn-save"), 'click', this.createCardItem, this);
            addEvent(customSelector(this.cardContainer).querySelector(".btn-cancel"), 'click', this.resetCardItemDesc, this);
        };

        Card.prototype.resetCardItemDesc = function (event) {
            this.self.cardDesc.value = "";
        };

        Card.prototype.getNewCardTemplate = function (task) {
            var html = '';
            html += '    <div class="card-header">';
            html += '        <div><h3 class="card-title">' + task + '</h3></div>';
            html += '    </div>';
            html += '     <div class="card-items"></div>    '
            html += '    <textarea class="task-data"></textarea>';
            html += '    <div class="card-footer">';
            html += '        <span class="btn-save">Save</span>';
            html += '        <span class="btn-cancel">Clear</span>';
            html += '    </div>';
            return html;
        };

        //Create a new object for a card item
        Card.prototype.createCardItem = function (cardName) {
            var cardItem = new CardItem();
            cardItem.addCardItem(this.self.cardDesc.value, this.self.cardContainer);
            this.self.cardDesc.value = "";
        };

        //Each card will have its own instance
        function CardItem() {
            this.cardItemContainer = '';
            this.content = '';
            this.editBox = '';
            this.saveEditedItem = '';
            this.resetEditedItem = '';
            this.textArea = '';
            this.itemDataText = '';
            this.editDeleteContainer = '';
        }

        //Adds a new card item to the existing card passed in
        CardItem.prototype.addCardItem = function (itemName, cardContainer) {
            if(!itemName) {
                showErrorMessage('Please enter the item name');
                return;
            }
            this.cardItemContainer = document.createElement('div');
            this.cardItemContainer.className = 'card-task';
            this.cardItemContainer.innerHTML = this.getNewCardItemTemplate(itemName);

            var itemsContainer = customSelector(cardContainer).querySelector(".card-items");
            itemsContainer.style.display = 'block';
            itemsContainer.appendChild(this.cardItemContainer);

            //Store reference to add card textbox to be used later while clearing data
            //this.cardItemText = customSelector(cardContainer).querySelector('.task-data');
            this.content = customSelector(this.cardItemContainer).querySelector('.item-data');
            this.itemDataText = customSelector(this.cardItemContainer).querySelector('.item-data-text');
            this.editBox = customSelector(this.cardItemContainer).querySelector('.edit-controls');
            this.editIcon = customSelector(this.cardItemContainer).querySelector('.icon-edit');
            this.deleteIcon = customSelector(this.cardItemContainer).querySelector('.icon-delete');
            this.saveEditedItem = customSelector(this.cardItemContainer).querySelector('.save-card-item');
            this.resetEditedItem = customSelector(this.cardItemContainer).querySelector('.reset-card-item');
            this.textArea = customSelector(this.cardItemContainer).querySelector('.task-data-edit');
            this.editDeleteContainer = customSelector(this.cardItemContainer).querySelector('.edit-delete-icons');

            //Attach events for edit and delete, save and cancel
            addEvent(this.editIcon, 'click', this.editCardItem, this);
            addEvent(this.deleteIcon, 'click', this.deleteCardItem, this);

            addEvent(this.saveEditedItem, 'click', this.saveEditedCardItem, this);
            addEvent(this.resetEditedItem, 'click', this.cancelEditedCardItem, this);

            toggleElement(this.cardItemContainer, this.editDeleteContainer);
        };

        //Template for a card item
        CardItem.prototype.getNewCardItemTemplate = function (data) {
            var html = '';
            html += '<div class="item-data"><span class="item-data-text">' + data + '</span>';
            html +=  '<span class="edit-delete-icons"><span class="icon-delete pull-right pointer">Delete</span><span class="icon-edit pull-right pointer">Edit</span></span></div>';
            html += '<div class="edit-controls hide"><textarea class="task-data-edit"></textarea>';
            html += '<div class="card-footer">';
            html +=     '<span class="btn-save save-card-item">Save</span>';
            html +=     '<span class="btn-cancel reset-card-item" id="resetData">Cancel</span>';
            html += '</div></div>';
            return html;
        };

        //Delete the card item
        CardItem.prototype.deleteCardItem = function (event) {
            var opt = window.confirm("Delete this item ?");
            if (opt) {
                this.self.cardItemContainer.parentNode.removeChild(this.self.cardItemContainer);
            }
        };

        //Editing card item
        CardItem.prototype.editCardItem = function (event) {
            show(this.self.editBox);
            var text = customSelector(this.self.content).querySelector(".item-data-text");
            if(text.innerText) {
                this.self.setTextContent(text.innerText);
            }
            else {
                this.self.setTextContent(text.innerHTML);
            }
            hide(this.self.content);
        };

        CardItem.prototype.setTextContent = function (data) {
            this.textArea.value = data;
        };

        CardItem.prototype.getTextContent = function () {
            return this.textArea.value;
        };

        CardItem.prototype.saveEditedCardItem = function (event) {
            show(this.self.content);
            hide(this.self.editBox);
            if(this.self.itemDataText.innerText) {
                this.self.itemDataText.innerText = this.self.getTextContent();
            }
            else {
                this.self.itemDataText.innerHTML = this.self.getTextContent();
            }
        };

        CardItem.prototype.cancelEditedCardItem = function (event) {
            show(this.self.content);
            hide(this.self.editBox);
        };

        cardManager.initializeCardManager();

        // DOM selector
        var customSelector = (function () {
            var myDOM = function (elems) {
                    return new MyDOMConstruct(elems);
                },
                MyDOMConstruct = function (elems) {
                    this.collection = elems[1] ? Array.prototype.slice.call(elems) : [elems];
                    return this;
                };
            myDOM.fn = MyDOMConstruct.prototype = {
                //Select the element for querySelector.
                select: function (element, selector, maxCount) {
                    var
                        all = element.all,
                        l = all.length,
                        i,
                        resultSet = [];
                    var selectorType = this.getQueryType(selector);
                    for (i = 0; i < l; i += 1) {
                        var selectorItem = all[i][selectorType.type];
                        if (selectorType.type == "className") {
                            selectorItem = selectorItem.split(" ");
                        }
                        else {
                            selectorItem = [selectorItem];
                        }
                        for (var j = 0; j < selectorItem.length; j++) {
                            if (selectorItem[j] == selectorType.str) {
                                resultSet.push(all[i]);
                                if (resultSet.length >= maxCount) {
                                    break;
                                }
                            }
                        }
                    }
                    return resultSet;

                },
                // Checks the Query type. Currently Id & classes is supported.
                getQueryType: function (selector) {
                    if (/^\$/.test(selector)) {
                        return {
                            type: "id",
                            str: selector.replace(/$/, '')
                        }
                    } else if (/^./.test(selector)) {
                        return {
                            type: "className",
                            str: selector.replace(/./, '')
                        }
                    }
                },
                // querySelector for supporting IE8 & IE7, currently supporting only Id & Class selection
                querySelector: function (selector) {
                    var elems = this.collection;
                    var result;
                    for (var i = 0, l = elems.length; i < l; i++) {
                        if (elems[i].querySelector) {
                            result = elems[i].querySelector(selector);
                        }
                        else {
                            result = this.select(elems[0], selector, 1)[0] || null;
                        }
                        if (result) break;
                    }
                    return result;
                },
                // Get the Closest parent element.
                getClosest: function (className) {
                    if (className) {
                        var el = this.collection[0];
                        do {
                            if (el.nodeType == 3) el = el.parentNode; // avoid the text type node.
                            var eleClassName = (el.className == undefined) ? el.activeElement.className : el.className;

                            if (eleClassName && containsClass(eleClassName, className)) {
                                return el;
                            }

                        } while (el = el.parentNode);
                        return null;
                    }
                }
            };
            return myDOM;
        })();

        // Checks the ClassNames string contains the className
        function containsClass(classNames, className) {
            classNames = classNames.split(" ");
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] === className) {
                    return true;
                }
            }
            return false;
        }
        //Insert the newNode element after the referenceNode
        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
        //returns the original element on which event is occured.
        function getSrcElement(e) {
            if (e.explicitOriginalTarget) { // For Mozilla
                return e.explicitOriginalTarget
            }
            else {
                return e.srcElement;
            }
        }

        // Drag & Drop - Single instance of drag & drop
        dragDrop = {
            init : function (options, elem) {
                var self = this;
                self.opt = options;
                self.elem = elem;
                self.mousemoving = false;
                self.eventRegistration();
            },
            eventRegistration : function () {
                var self = this;
                addEvent(self.elem, "mousedown", function (e) {
                    var srcElement = getSrcElement(e);
                    var classes = srcElement.className;
                    for (var i = 0; i < self.opt.exceptionList.length; i++) {
                        if (classes) {
                            if (containsClass(classes, self.opt.exceptionList[i])) {
                                return;
                            }
                        }
                    }

                    self.itemsList = customSelector(srcElement).getClosest(self.opt.listContainer);
                    var element = customSelector(srcElement).getClosest(self.opt.items);
                    if (element) {
                        self.mousedown(e, element);
                        if (self.draggingElement) {
                            document.body.className = "preventTextSelection";
                            document.onselectstart = new Function("return false");
                            document.body.unselectable = "on";
                            var mouseMoveFn = function (e) {
                                if (this.self) {
                                    this.self.mousemove(e);
                                }
                                return false;
                            }
                            var mouseUpFn = function (e) {
                                if (this.self) {
                                    this.self.drop(e);
                                    removeEvent(document, "mousemove", mouseMoveFn);
                                    removeEvent(document, "mouseup", mouseUpFn);
                                }
                                return false;
                            }
                            addEvent(document, "mousemove", mouseMoveFn, self);
                            addEvent(document, "mouseup", mouseUpFn, self);
                        }
                    }
                }, self);
            },
            mousedown : function (e, element) {
                var self = this;
                self.mousemoving = false;
                self.draggingElement = element;
                self.opt.placeHolder = document.createElement("div");
                self.opt.placeHolder.className = "placeHolder";
                self.opt.placeHolder.style.height = (self.draggingElement.clientHeight || self.draggingElement.scrollHeight) + "px";
                self.opt.placeHolder.style.width = (self.draggingElement.clientWidth || self.draggingElement.offsetWidth) + "px";
                self.opt.helper = self.draggingElement.cloneNode(true);
                self.opt.helper.style.height = (self.draggingElement.clientHeight || self.draggingElement.scrollHeight) + "px";
                self.opt.helper.style.width = (self.draggingElement.clientWidth || self.draggingElement.offsetWidth) + "px";
                self.opt.helper.style.position = "absolute";
                hide(self.opt.helper);
                document.body.appendChild(self.opt.helper);
                self.draggingElement.parentNode.appendChild(hide(self.opt.placeHolder));
            },
            mousemove : function (e) {
                var self = this;
                if (!self.mousemoving) {
                    show(self.opt.helper);
                    show(self.opt.placeHolder);
                    hide(self.draggingElement);
                }
                self.mousemoving = true;
                self.opt.helper.style.top = e.clientY + 5 + "px";
                self.opt.helper.style.left = e.clientX + 10 + "px";
                self.elementAtXY = self.getElementAtXY(e.clientX, e.clientY);
                if (self.elementAtXY != null) {
                    self.showPlaceholder(e.clientX, e.clientY);
                }
            },
            getElementAtXY: function (x, y) {
                var self = this;
                var element = customSelector(document.elementFromPoint(x, y)).getClosest(self.opt.items);
                return element;
            },

            drop :function (e) {
                var self = this;
                self.mousemoving = false;
                document.body.removeChild(self.opt.helper);
                if (self.draggingElement != null) {
                    var draggingElement = self.draggingElement;
                    insertAfter(self.draggingElement, self.opt.placeHolder);
                    show(self.draggingElement);
                    self.reset();
                } else {
                    self.reset();
                }

            },
            showPlaceholder : function (x, y) {
                var self = this;
                var position = self.elementAtXY.getBoundingClientRect();
                var height = position.height;
                if (!height) {
                    height = (self.elementAtXY.clientHeight || self.elementAtXY.scrollHeight)
                }
                if ((position.top + (height / 2)) > y) {
                    self.itemsList = customSelector(self.elementAtXY).getClosest('items');
                    if (self.itemsList) {
                        self.itemsList.insertBefore(self.opt.placeHolder, self.elementAtXY);
                    }

                } else {
                    insertAfter(self.opt.placeHolder, self.elementAtXY);
                }
            },
            reset : function () {
                document.body.className = "";
                document.body.unselectable = "off";
                document.onselectstart = new Function("return true")
                var self = this;
                self.opt.placeHolder.parentNode.removeChild(self.opt.placeHolder);
                self.draggingElement = null;
                self.elementAtXY = null;
                try {
                    document.body.removeChild(self.opt.helper);
                }
                catch (e) {
                }
            }
        };
    }
    catch (e) {
        console.log(e);
    }
})();