var sec = 0,
  min = 0,
  move = 0,
  matchedCount = 0;
let cards;
let firstCard = false;
let secondCard = false;
var second = document.getElementById("second");
var minute = document.getElementById("minute");
var moves = document.getElementById("moves");

const cardContainer = document.querySelector(".card-container");
const board = document.querySelector(".board");
const winPage = document.querySelector(".win-page");

const totalSecond = document.getElementById("total-sec");
const totalMinute = document.getElementById("total-min");
const totalMoves = document.getElementById("total-moves");

var interval = setInterval(startTimer, 1000); //timer

let firstCardValue;

const imgArray = [
  { name: "frog", image: "/Images/img-1.jpg" },
  { name: "cat", image: "/Images/img-2.jpg" },
  { name: "cow", image: "/Images/img-3.jpg" },
  { name: "koala", image: "/Images/img-4.jpg" },
  { name: "tiger", image: "/Images/img-5.jpg" },
  { name: "chick", image: "/Images/img-6.jpg" },
  { name: "rabbit", image: "/Images/img-7.jpg" },
  { name: "hamster", image: "/Images/img-8.jpg" },
];

function startTimer() {
  sec++;
  sec < 10 ? (second.innerHTML = "0" + sec) : (second.innerHTML = sec);

  if (sec > 59) {
    sec = 0;
    sec < 10 ? (second.innerHTML = "0" + sec) : (second.innerHTML = sec);
    min++;
    min < 10 ? (minute.innerHTML = "0" + min) : (minute.innerHTML = min);
  }
}

function moveCounter() {
  move++;
  moves.innerHTML = move;
}

const generateRandom = (size = 4) => {
  //temp array
  let tempArray = [...imgArray];
  //empty array to hold the random cards
  let cardValue = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    //select a random number from 0-7
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    //insert the (random)th value from tempArray to cardValue array
    cardValue.push(tempArray[randomIndex]);
    //remove the added item
    tempArray.splice(randomIndex, 1);
  }
  return cardValue;
};

//matrixGenerator
const matrixGenerator = (cardValue, size = 4) => {
  cardContainer.innerHTML = "";
  cardValue = [...cardValue, ...cardValue];
  //shuffle
  cardValue.sort(() => Math.random() - 0.5);

  for (let i = 0; i < size * size; i++) {
    cardContainer.innerHTML += `<div class="card">
            <div class="face front-face">
              <img src="${cardValue[i].image}" alt="${cardValue[i].name}" />
            </div>
            <div class="face back-face">?</div>
          </div>`;
  }
};

//initializer
const initializer = () => {
  let cardValue = generateRandom();
  console.log(cardValue);
  matrixGenerator(cardValue);
};

initializer();

//cards
cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("matched")) {
      //adding "flipped" class name when clicked
      card.classList.add("flipped");

      if (!firstCard) {
        //if first card is false, the current card will be first card
        firstCard = card;
        //the name will be stored in "firstCardValue" for comparison
        firstCardValue =
          firstCard.firstElementChild.firstElementChild.getAttribute("alt");
      } else {
        //increment counter
        moveCounter();

        //second chosen card will be the second card
        secondCard = card;
        //the name will be stored in "secondCardValue" for comparsion
        let secondCardValue =
          secondCard.firstElementChild.firstElementChild.getAttribute("alt");

        //if they match
        if (firstCardValue == secondCardValue) {
          //adding "matched" so that it wont flip back
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");

          //making falseCard false so that the user can choose again
          firstCard = false;

          matchedCount++;

          //when you win
          if (matchedCount == 8) {
            board.style.display = "none";
            winPage.style.display = "block";
            stopGame();
          }
        }
        //if they dont match
        else {
          let [tempFirst, tempSecond] = [firstCard, secondCard];
          firstCard = false;
          secondCard = false;
          let delay = setTimeout(() => {
            tempFirst.classList.remove("flipped");
            tempSecond.classList.remove("flipped");
          }, 900);
        }
      }
    }
  });
});

//When stop button is clicked
var stopBtn = document.getElementById("stopBtn");

stopBtn.addEventListener("click", function () {
  stopGame();
  window.location.assign("/Website/HTML/index.html");
});

function stopGame() {
  //produce result
  sec < 10
    ? (totalSecond.innerHTML = "0" + sec)
    : (totalSecond.innerHTML = sec);
  min < 10
    ? (totalMinute.innerHTML = "0" + min)
    : (totalMinute.innerHTML = min);
  totalMoves.innerHTML = move;

  //reset
  clearInterval(interval);
  sec = min = move = matchedCount = 0;
  sec < 10 ? (second.innerHTML = "0" + sec) : (second.innerHTML = sec);
  min < 10 ? (minute.innerHTML = "0" + min) : (minute.innerHTML = min);
  moves.innerHTML = move;
}

// ********** YOU WON PAGE ***********

//play again button
const playAgain = document.getElementById("playAgainBtn");
playAgain.addEventListener("click", function () {
  window.location.reload();
});
