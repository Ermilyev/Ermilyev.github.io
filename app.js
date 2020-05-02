const text = document.querySelectorAll("#text path")

text.forEach(function (text, i) {
    console.log(`Letter ${i} is ${text.getTotalLength()}`);
  });