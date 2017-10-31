'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var GameApp = function () {
    function GameApp(gameContainer, reload) {
      _classCallCheck(this, GameApp);

      this.gameContainer = document.getElementById('' + gameContainer);
      this.reloadButton = document.getElementById(reload);

      if (this.reloadButton) {
        var self = this;
        this.reloadButton.addEventListener('click', function () {
          self.loadGame();
        });
      }
    }

    _createClass(GameApp, [{
      key: 'fetch',
      value: function (_fetch) {
        function fetch(_x) {
          return _fetch.apply(this, arguments);
        }

        fetch.toString = function () {
          return _fetch.toString();
        };

        return fetch;
      }(function (url) {
        if (typeof fetch !== 'undefined') {
          return fetch(url);
        } else {
          return new Promise(function (resolve) {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
              if (this.readyState == 4) {
                var data = JSON.parse(this.responseText);
                resolve(data);
              }
            };
            req.open('GET', url, true);
            req.send();
          });
        }
      })
    }, {
      key: 'loadGame',
      value: function loadGame() {
        var _this = this;

        this.reloadButton.classList.add('hide');
        this.fetch('http://localhost:8082/').then(function (response) {
          if (response.json) {
            return response.json();
          } else {
            return response;
          }
        }).then(function (data) {
          var _data$outcomes = data.outcomes,
              outcomes = _data$outcomes === undefined ? [] : _data$outcomes,
              _data$bonus = data.bonus,
              bonus = _data$bonus === undefined ? false : _data$bonus;

          var winType = _this.findWin(outcomes);
          _this.render(outcomes, winType);

          if (bonus) {
            alert('You have got a bonus !!! Click OK to reload in 5 seconds...');
            setTimeout(function () {
              _this.loadGame();
              _this.reloadButton.classList.remove('hide');
            }, 5000);
          } else {
            _this.reloadButton.classList.remove('hide');
          }
        });
      }
    }, {
      key: 'findWin',
      value: function findWin(outcomes) {
        if (outcomes[0] === outcomes[1] && outcomes[1] === outcomes[2]) {
          return 'Big Win!';
        } else if (outcomes[0] === outcomes[1] || outcomes[0] === outcomes[2] || outcomes[1] === outcomes[2]) {
          return 'Small Win!';
        } else if (outcomes[0] !== outcomes[1] && outcomes[0] !== outcomes[2] && outcomes[1] !== outcomes[2]) {
          return 'No Win!';
        }
      }
    }, {
      key: 'render',
      value: function render(outcomes, winType) {
        var template = '\n        <h2 class="message">' + winType + '</h2>\n        <div class="fruit-container">\n          <div class="fruit">\n            <img src="../images/Symbol_' + outcomes[0] + '.png" alt="" />\n          </div>\n          <div class="fruit">\n            <img src="../images/Symbol_' + outcomes[1] + '.png" alt="" />  \n          </div>\n          <div class="fruit">\n            <img src="../images/Symbol_' + outcomes[2] + '.png" alt="" />\n          </div>\n        </div>\n    ';
        var dummyDiv = document.createElement('div'); // Creating dummy DIV since IE has issues with innerHTML
        dummyDiv.innerHTML = template;
        this.gameContainer.innerText = '';
        this.gameContainer.appendChild(dummyDiv);
      }
    }]);

    return GameApp;
  }();

  var gameApp = new GameApp('gameContainer', 'reloadGame');
  gameApp.loadGame();
})();

//# sourceMappingURL=main.es5.js.map