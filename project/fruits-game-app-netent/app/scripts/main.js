(function () {
  class GameApp {
    constructor(gameContainer, reload) {
      this.gameContainer = document.getElementById(`${gameContainer}`);
      this.reloadButton = document.getElementById(reload);

      if (this.reloadButton) {
        const self = this;
        this.reloadButton.addEventListener('click', () => {
          self.loadGame();
        });
      }
    }

    fetch(url) {
      if (typeof fetch !== 'undefined') {
        return fetch(url);
      } else {
        return new Promise((resolve) => {
          var req = new XMLHttpRequest();
          req.onreadystatechange = function() {
            if (this.readyState == 4) {
              const data = JSON.parse(this.responseText);
              resolve(data);
            }
          };
          req.open('GET', url, true);
          req.send();
        });
      }
    }

    loadGame() {
      this.reloadButton.classList.add('hide');
      this.fetch('http://localhost:8082/').then(function(response) {
        if (response.json) {
          return response.json();
        } else {
          return response;
        }
      }).then(data => {
        const { outcomes = [], bonus = false } = data;
        const winType = this.findWin(outcomes);
        this.render(outcomes, winType);

        if (bonus) {
          alert('You have got a bonus !!! Click OK to reload in 5 seconds...');
          setTimeout(() => {
            this.loadGame();
            this.reloadButton.classList.remove('hide');
          }, 5000);
        } else {
          this.reloadButton.classList.remove('hide');
        }
      });
    }

    findWin(outcomes) {
      if (outcomes[0] === outcomes[1] && outcomes[1] === outcomes[2]) {
        return 'Big Win!';
      } else if (outcomes[0] === outcomes[1] || outcomes[0] === outcomes[2] || outcomes[1] === outcomes[2]) {
        return 'Small Win!';
      } else if (outcomes[0] !== outcomes[1] && outcomes[0] !== outcomes[2] && outcomes[1] !== outcomes[2]) {
        return 'No Win!';
      }
    }

    render(outcomes, winType) {
      const template = `
        <h2 class="message">${winType}</h2>
        <div class="fruit-container">
          <div class="fruit">
            <img src="../images/Symbol_${outcomes[0]}.png" alt="" />
          </div>
          <div class="fruit">
            <img src="../images/Symbol_${outcomes[1]}.png" alt="" />  
          </div>
          <div class="fruit">
            <img src="../images/Symbol_${outcomes[2]}.png" alt="" />
          </div>
        </div>
    `;
      var dummyDiv = document.createElement('div'); // Creating dummy DIV since IE has issues with innerHTML
      dummyDiv.innerHTML = template;
      this.gameContainer.innerText = '';
      this.gameContainer.appendChild(dummyDiv);
    }
  }

  const gameApp = new GameApp('gameContainer', 'reloadGame');
  gameApp.loadGame();
})();