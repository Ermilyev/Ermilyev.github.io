class Character {
  constructor(id, happyImg, sadImg) {
    this.element = document.getElementById(id);
    this.happyImg = happyImg;
    this.sadImg = sadImg;
  }

  move(container) {
    const maxX = container.clientWidth - this.element.clientWidth;
    const maxY = container.clientHeight - this.element.clientHeight;

    const x = Math.max(10, Math.min(Math.random() * maxX, maxX - 10));
    const y = Math.max(10, Math.min(Math.random() * maxY, maxY - 10));

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }
}

class Boikova extends Character {
  constructor() {
    super("boikova", "img/boikova-happy.png", "img/boikova-sad.png");
  }

  setMood(happy) {
    this.element.src = happy ? this.happyImg : this.sadImg;
  }
}

class Kozlovsky extends Character {
  constructor() {
    super("kozlovsky", "", "");
    this.active = false;
    this.interval = null;
  }

  appear(game) {
    if (this.active) return;
    this.active = true;
    this.element.style.display = "block";
    game.boikova.setMood(false);
    UI.showMessage("Козловский появился! 😡");

    this.interval = setInterval(() => {
      if (game.score > 0) {
        game.score--;
        game.updateUI();
      }
    }, 1000);
  }

  defeat(game) {
    if (!this.active) return;
    this.active = false;
    this.element.style.display = "none";
    clearInterval(this.interval);
    game.boikova.setMood(true);
    game.score += 5;
    UI.showMessage("Козловский побеждён! 🏆");
    UI.createEffect(game.container.clientWidth / 2, game.container.clientHeight / 2, "🏆");
    game.updateUI();
  }
}