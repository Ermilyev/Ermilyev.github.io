class Game {
  constructor() {
    this.state = Storage.loadGameState();
    this.boikova = new Boikova();
    this.kozlovsky = new Kozlovsky();
    this.container = document.querySelector('.container');

    document.getElementById("boikova").addEventListener("click", () => this.petBoikova());
    document.getElementById("kozlovsky").addEventListener("click", () => this.kozlovsky.defeat(this));
    document.getElementById("exchange-btn").addEventListener("click", () => this.exchangeHearts());
    document.getElementById("jump-btn").addEventListener("click", () => this.makeJump());

    this.updateUI();
    setTimeout(() => this.kozlovsky.appear(this), 10000);
  }

  get score() { return this.state.score; }
  set score(value) { this.state.score = value; Storage.saveGameState(this.state); }

  petBoikova() {
    this.score++;
    UI.showMessage("Ты сделал её день лучше! ❤️");
    UI.createEffect(event.clientX, event.clientY, "❤️");
    this.boikova.move(this.container);
    this.updateUI();

    if (this.score >= 10 && !this.kozlovsky.active) {
      this.kozlovsky.appear(this);
    }
  }

  exchangeHearts() {
    if (this.score >= 25) {
      this.score -= 25;
      this.state.superHearts++;
      UI.showMessage("Обмен состоялся! 💖");
      this.updateUI();
    }
  }

  makeJump() {
    if (this.state.superHearts >= 10) {
      this.state.superHearts -= 10;
      if (Math.random() < 0.5) {
        this.state.goldMedals++;
        UI.showMessage("Олимпиада в кармане! 🥇");
      } else {
        UI.showMessage("Попробуй ещё раз! 😵");
      }
      this.updateUI();
    }
  }

  updateUI() {
    UI.updateScore(this.score, this.state.superHearts, this.state.goldMedals);
  }
}