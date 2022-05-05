class SimonGame {
  #sequence;
  #userClickCount;
  #level;

  #showInterval;
  #currentGameType;

  #elemGameContainer;
  #elemGameInfo;
  #elemGameButtonGroup;
  #elemGameTypes;
  #elemAllGameButtons;

  constructor() {
    this.#resetState();
    this.#showInterval = 2000;

    this.#initHtmlElements();
  }

  init() {
    this.#currentGameType = this.#readGameType();
    this.#setGameInfo(1);
    this.#generateSequence();
    this.#showSequence();

    this.#enableGameButtons();
  }

  gameOver() {
    this.#resetState();
    this.#disableGameButtons();
    this.#enableControls();
    this.#setLost();

    this.#setGameInfo(SimonGame.#msgAgain);
  }

  static get #msgStart() {
    return "Click to start.\n🤠";
  }

  static get #msgAgain() {
    return `🙊\nGame over.\nTry again.\n💪`;
  }

  static get #colors() {
    return ["red", "green", "blue", "yellow"];
  }

  #showSequence() {
    let current = 0;

    this.#setCpuTurn();

    const interval = setInterval(() => {
      if (!this.#sequence[current]) {
        clearInterval(interval);
        this.#setPlayerTurn();
        return;
      }

      const button = this.#elemAllGameButtons.find(
        ({ id }) => id === this.#sequence[current]
      );

      button.classList.add("active");

      setTimeout(
        () => button.classList.remove("active"),
        this.#showInterval / 2
      );

      current++;
    }, this.#showInterval);
  }

  #checkUserInput({ target }) {
    const colorInput = target.getAttribute("id");

    const currentColor = this.#sequence[this.#userClickCount];

    if (currentColor !== colorInput) {
      this.gameOver();
      return;
    }

    this.#userClickCount++;

    if (this.#userClickCount === this.#sequence.length) {
      this.#advanceToNextRound();
    }
  }

  #advanceToNextRound() {
    this.#userClickCount = 0;
    this.#level++;
    this.#setGameInfo(this.#level);

    this.#generateSequence();
    this.#showSequence();
  }

  #generateSequence() {
    const randomColor = Math.floor(Math.random() * 4);
    this.#sequence.push(SimonGame.#colors[randomColor]);
  }

  #readGameType() {
    for (const radioButton of this.#elemGameTypes) {
      if (radioButton.checked) {
        return radioButton.value;
      }
    }

    return "easy";
  }

  #resetState() {
    this.#sequence = [];
    this.#userClickCount = 0;
    this.#level = 1;
  }

  #initHtmlElements() {
    this.#elemGameTypes = document.querySelectorAll("input[name='gametype']");

    this.#elemGameContainer = document.getElementById("game-container");
    this.#elemGameButtonGroup = document.getElementById("buttons-container");
    this.#elemGameInfo = document.getElementById("game-info");

    this.#setGameInfo(SimonGame.#msgStart);
    this.#elemGameInfo.onclick = this.#gameInfoClickHandler.bind(this);

    this.#elemAllGameButtons = Array.from(
      this.#elemGameButtonGroup.getElementsByClassName("btn-game")
    );
  }

  #enableGameButtons() {
    this.#elemAllGameButtons.forEach(
      (el) => (el.onclick = this.#checkUserInput.bind(this))
    );
  }

  #disableGameButtons() {
    this.#elemAllGameButtons.forEach((el) => (el.onclick = null));
  }

  #gameInfoClickHandler({ target }) {
    if (target.disabled) {
      return;
    }

    this.#disableControls();

    this.init();
  }

  #disableControls() {
    this.#elemGameInfo.disabled = true;
    this.#elemGameTypes.forEach((el) => (el.disabled = true));
  }

  #enableControls() {
    this.#elemGameInfo.disabled = false;
    this.#elemGameTypes.forEach((el) => (el.disabled = false));
  }

  #setGameInfo(val) {
    this.#elemGameInfo.innerHTML = val;
  }

  #setWaiting() {
    this.#removeGameStateClasses();

    this.#elemGameButtonGroup.classList.remove("blocked");

    this.#elemGameInfo.classList.remove("cpu-turn", "player-turn", "lost");
    this.#elemGameInfo.classList.add("waiting");
  }

  #setCpuTurn() {
    this.#addGameStateClasses();

    this.#elemGameButtonGroup.classList.add("blocked");

    this.#elemGameInfo.classList.remove("waiting", "player-turn", "lost");
    this.#elemGameInfo.classList.add("cpu-turn");
  }

  #setPlayerTurn() {
    this.#addGameStateClasses();

    this.#elemGameButtonGroup.classList.remove("blocked");

    this.#elemGameInfo.classList.remove("waiting", "cpu-turn", "lost");
    this.#elemGameInfo.classList.add("player-turn");
  }

  #setLost() {
    this.#removeGameStateClasses();
    this.#elemGameButtonGroup.classList.remove("blocked");

    this.#elemGameInfo.classList.remove("waiting", "cpu-turn", "player-turn");
    this.#elemGameInfo.classList.add("lost");
  }

  #addGameStateClasses() {
    switch (this.#currentGameType) {
      case "crazy":
        this.#elemGameContainer.classList.add("D3");
      case "hard":
        this.#elemGameButtonGroup.classList.add("rotate");
        break;
    }
  }

  #removeGameStateClasses() {
    this.#elemGameContainer.classList.remove("D3");
    this.#elemGameButtonGroup.classList.remove("rotate");
  }
}

new SimonGame();
