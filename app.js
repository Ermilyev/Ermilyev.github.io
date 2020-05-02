const text = document.querySelectorAll("#text path")

logo.forEach(function (text, i) {
    console.log(`Letter ${i} is ${text.getTotalLength()}`);
  });