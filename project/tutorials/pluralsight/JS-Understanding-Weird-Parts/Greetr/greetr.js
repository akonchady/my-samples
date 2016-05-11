;(function(global, $) {

    // 'new' an object
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    };

    // hidden within the scope of IIFE and never directly accessible
    var supportedLanguages = ['en', 'es'];

    // informal greetings
    var greetings = {
        'en': 'Hello',
        'es': 'Hola'
    };

    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    // logger messages
    var logMessages = {
        en: 'Logged in ',
        es: 'Inicio sesion'
    };

    Greetr.prototype = {
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        },
        validate: function () {
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw "Invalid Language";
            }
        },
        greeting: function () {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        formalGreeting: function () {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        // chainable methods return their own containing objects
        greet: function (formal) {
            var msg;

            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            return this;
        },
        setLanguage: function (language) {
            this.language = language;
            this.validate();
            return this;
        },
        HTMLGreeting: function (selector, formal) {
            if (!$) {
                throw 'JQuery not loaded';
            }

            if (!selector) {
                throw 'Missing JQuery selector';
            }

            var msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            $(selector).html(msg);

            return this;
        }
    };

    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || '',
        self.lastName = lastName || '',
        self.language = language || 'en';

        self.validate();
    };

    // Object created from Greetr.init .. it's __proto__ property should be pointing
    // to Greetr.prototype
    Greetr.init.prototype = Greetr.prototype;

    global.G$ = global.Greetr = Greetr;

})(window, jQuery);