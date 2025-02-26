class UI {
  static updateScore(score, superHearts, goldMedals) {
    document.getElementById('score').textContent = score;
    document.getElementById('super-hearts').textContent = superHearts;
    document.getElementById('gold-medals').textContent = goldMedals;
  }

  static showMessage(text) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.style.opacity = "1";
    setTimeout(() => message.style.opacity = "0", 3000);
  }

  static createEffect(x, y, emoji) {
    const effect = document.createElement("div");
    effect.classList.add("effect");
    effect.textContent = emoji;
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
  }
}