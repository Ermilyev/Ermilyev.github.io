const boikova = document.getElementById('boikova');
const kozlovsky = document.getElementById('kozlovsky');
const message = document.getElementById('message');
const exchangeBtn = document.getElementById("exchange-btn");
const jumpBtn = document.getElementById("jump-btn");

let score = 0, superHearts = 0, goldMedals = 0;
let kozlovskyActive = false, kozlovskyInterval;

const boikovaHappy = "img/boikova-happy.png";
const boikovaSad = "img/boikova-sad.png";

function showMessage(text) {
  message.textContent = text;
  message.style.opacity = "1";
  setTimeout(() => message.style.opacity = "0", 3000);
}

function createEffect(x, y, emoji) {
  const effect = document.createElement("div");
  effect.classList.add("effect");
  effect.textContent = emoji;
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
  document.body.appendChild(effect);
  setTimeout(() => effect.remove(), 1000);
}

function moveImage(element) {
  const container = document.querySelector('.container');
  const maxX = container.clientWidth - element.clientWidth;
  const maxY = container.clientHeight - element.clientHeight;
  element.style.left = `${Math.random() * maxX}px`;
  element.style.top = `${Math.random() * maxY}px`;
}

function updateUI() {
  document.getElementById('score').textContent = score;
  document.getElementById('super-hearts').textContent = superHearts;
  document.getElementById('gold-medals').textContent = goldMedals;
  exchangeBtn.disabled = score < 25;
  jumpBtn.disabled = superHearts < 10;
}

function summonKozlovsky() {
  if (kozlovskyActive) return;
  kozlovskyActive = true;
  kozlovsky.style.display = "block";
  boikova.src = boikovaSad;
  showMessage("Козловский появился! 😡");
  moveImage(kozlovsky);
  kozlovskyInterval = setInterval(() => {
    if (score > 0) {
      score--;
      updateUI();
    }
  }, 1000);
}

function defeatKozlovsky(e) {
  if (!kozlovskyActive) return;
  kozlovskyActive = false;
  clearInterval(kozlovskyInterval);
  kozlovsky.style.display = "none";
  boikova.src = boikovaHappy;
  score += 5;
  showMessage("Козловский побеждён! 🏆");
  createEffect(e.clientX, e.clientY, "🏆");
  updateUI();
  setTimeout(summonKozlovsky, 10000);
}

boikova.addEventListener('click', (e) => {
  score++;
  showMessage("Ты сделал её день лучше! ❤️");
  createEffect(e.clientX, e.clientY, "❤️");
  moveImage(boikova);
  updateUI();
});

kozlovsky.addEventListener('click', defeatKozlovsky);

document.addEventListener('DOMContentLoaded', updateUI);