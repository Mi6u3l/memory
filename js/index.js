const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" }
];

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards();

window.addEventListener("load", (event) => {
  let html = "";
  memoryGame.cards.forEach((pic) => {
    html += `<div class="card" data-card-name="${pic.name}">`;
    html += `<div class="back" name="${pic.img}"></div>`;
    html += `<div class="front" style="background: url(img/${pic.img}) no-repeat"></div>`;
    html += `</div>`;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      if (memoryGame.pickedCards.length < 2) {
        card.classList.add("turned");
        memoryGame.pickedCards.push(card);
      }

      if (memoryGame.pickedCards.length === 2) {
        const pair1 =
          memoryGame.pickedCards[0].attributes["data-card-name"].value;
        const pair2 =
          memoryGame.pickedCards[1].attributes["data-card-name"].value;
        if (!memoryGame.checkIfPair(pair1, pair2)) {
          setTimeout(() => {
            memoryGame.pickedCards.forEach((_card) => {
              _card.classList.remove("turned");
              memoryGame.pickedCards = [];
            });
          }, 1000);
        } else {
          document.getElementById("pairs-guessed").innerText = memoryGame.pairsGuessed;
          memoryGame.pickedCards = [];
        }
        document.getElementById("pairs-clicked").innerText  = memoryGame.pairsClicked;
      }
    });
  });
});
