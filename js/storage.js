class Storage {
  static saveGameState(state) {
    localStorage.setItem("gameState", JSON.stringify(state));
  }

  static loadGameState() {
    return JSON.parse(localStorage.getItem("gameState")) || { score: 0, superHearts: 0, goldMedals: 0 };
  }
}