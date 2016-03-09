(function() {
    var app = angular.module('coviam', []);
    app.controller('HomeController', function($http, $window) {
        var self = this;

        self.cartItemCount = 0;
        self.cartTotal = 0;
        // API calls
        $http.get('data/product.json').then(
            function (data) {
                self.products = data.data.products;

                var storageProducts = $window.localStorage.getItem('coviamProducts');
                if (storageProducts !== null) {
                    storageProducts = JSON.parse(storageProducts);

                    self.products.forEach(function(product) {
                        product.addedCount = 0;

                        var storageProduct = storageProducts.filter(function(item) {
                            return item.id === product.id;
                        });
                        storageProduct = storageProduct[0];
                        product.addedCount = storageProduct.addedCount ? storageProduct.addedCount : 0;

                        if(product.addedCount > 0) {
                            self.cartItemCount += 1;
                            self.cartTotal += Number(product.price) * parseInt(product.addedCount);
                        }
                    });
                }
                else {
                    self.products.forEach(function(product) {
                        product.addedCount = 0;
                    });
                }
            },
            function (data) {
                throw new Error(data);
            });

        // Persist the data to local storage
        this.persist = function () {
            $window.localStorage.setItem('coviamProducts', JSON.stringify(self.products));
        };

        // Add individual item to cart
        this.addToCart = function(index) {
            var product = self.products[index];
            product.addedCount = product.addedCount ? ++product.addedCount : 1;

            self.persist();

            if(product.addedCount === 1) {
                self.cartItemCount++;
            }

            self.cartTotal += Number(product.price);
        };

        // Remove individual items from cart
        this.removeFromCart = function (index) {
            var product = self.products[index];
            product.addedCount = product.addedCount > 0 ? --product.addedCount : 0;

            self.persist();

            if(product.addedCount === 0) {
                self.cartItemCount--;
            }

            self.cartTotal -= Number(product.price);
        };

        this.filterCart = function (product) {
            return (product.addedCount > 0);
        };
        
        this.massRemoveFromCart = function (id) {
            // If removing from cart, adjust cart total and cart item count
            self.products.map(function(product) {
                if(product.id === id) {
                    var productAmount = Number(product.price) * parseInt(product.addedCount);
                    self.cartTotal -= productAmount;
                    self.cartItemCount--;
                    product.addedCount = 0;
                }
            })

            self.persist();
        };
    });
})();