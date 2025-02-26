const boikova = document.getElementById('boikova');
const kozlovsky = document.getElementById('kozlovsky');
const message = document.getElementById('message');
const exchangeBtn = document.getElementById("exchange-btn");
const jumpBtn = document.getElementById("jump-btn");

let score = parseInt(localStorage.getItem("score")) || 0;
let superHearts = parseInt(localStorage.getItem("superHearts")) || 0;
let goldMedals = parseInt(localStorage.getItem("goldMedals")) || 0;
let kozlovskyActive = false, kozlovskyInterval, kozlovskyTimeout;

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
  effect.style.position = "absolute";
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
  document.body.appendChild(effect);
  setTimeout(() => effect.remove(), 1000);
}

function moveImage(element) {
  const container = document.querySelector('.container');
  const maxX = container.clientWidth - element.clientWidth;
  const maxY = container.clientHeight - element.clientHeight;
  
  const x = Math.max(10, Math.min(Math.random() * maxX, maxX - 10));
  const y = Math.max(10, Math.min(Math.random() * maxY, maxY - 10));
  
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
}

function updateUI() {
  document.getElementById('score').textContent = score;
  document.getElementById('super-hearts').textContent = superHearts;
  document.getElementById('gold-medals').textContent = goldMedals;
  
  exchangeBtn.disabled = score < 25;
  jumpBtn.disabled = superHearts < 10;

  localStorage.setItem("score", score);
  localStorage.setItem("superHearts", superHearts);
  localStorage.setItem("goldMedals", goldMedals);
}

function summonKozlovsky() {
  if (kozlovskyActive || score < 10) return;
  kozlovskyActive = true;
  kozlovsky.style.display = "block";
  boikova.src = boikovaSad;
  showMessage("Козловский появился! 😡");
  moveImage(kozlovsky);

  clearInterval(kozlovskyInterval);
  kozlovskyInterval = setInterval(() => {
    if (score > 0) {
      score--;
      updateUI();
    } else {
      clearInterval(kozlovskyInterval);
      kozlovsky.style.display = "none";
      kozlovskyActive = false;
    }
  }, 1000);
}

function defeatKozlovsky(e) {
  if (!kozlovskyActive) return;
  kozlovskyActive = false;
  kozlovsky.style.display = "none";
  clearInterval(kozlovskyInterval);
  clearTimeout(kozlovskyTimeout);
  boikova.src = boikovaHappy;
  score += 5;
  showMessage("Козловский побеждён! 🏆");
  createEffect(e.clientX, e.clientY, "🏆");
  updateUI();
  kozlovskyTimeout = setTimeout(summonKozlovsky, 10000);
}

boikova.addEventListener('click', (e) => {
  score++;
  showMessage("Ты сделал её день лучше! ❤️");
  createEffect(e.clientX, e.clientY, "❤️");
  moveImage(boikova);
  updateUI();
  
  if (score >= 10 && !kozlovskyActive) {
    summonKozlovsky();
  }
});

kozlovsky.addEventListener('click', defeatKozlovsky);

exchangeBtn.addEventListener('click', () => {
  if (score >= 25) {
    score -= 25;
    superHearts++;
    showMessage("Обмен состоялся! 💖");
    createEffect(window.innerWidth / 2, window.innerHeight / 2, "💖");
    updateUI();
  }
});

jumpBtn.addEventListener('click', (e) => {
  if (superHearts >= 10) {
    superHearts -= 10;
    let success = Math.random() < 0.5;
    if (success) {
      goldMedals++;
      showMessage("Олимпиада в кармане! 🥇");
      createEffect(e.clientX, e.clientY, "🥇");
    } else {
      showMessage("Попробуй ещё раз! 😵");
      createEffect(e.clientX, e.clientY, "😵");
    }
    updateUI();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  moveImage(boikova);
  kozlovskyTimeout = setTimeout(summonKozlovsky, 10000);
});
