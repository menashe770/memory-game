const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color, 'card');
    // newDiv.classList.add('card');
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);

//
let cardFlipped = false;
let card1, card2;
let color1, color2;
let canClick = true;

function clearColors() {
  card1.style.backgroundColor = '';
  card2.style.backgroundColor = '';
  canClick = true;
  // console.log('canClick: ', canClick)
}

document.querySelector('#game').addEventListener('click', function(e) {
  // debugger;
  if (!canClick) return;
  if (e.target.classList.contains('open')) return;
  if (!e.target.classList.contains('card')) return;
  
  e.target.style.backgroundColor = e.target.classList[0];

  if (!cardFlipped) {
    card1 = e.target;
    color1 = card1.classList[0];
    cardFlipped = true;
    // console.log('Color 1: ', color1);
    card1.classList.add('flipped');
    // console.log('canClick: ', canClick)
    return;
  }
  if (cardFlipped) {
    card2 = e.target;
    if (card2.classList.contains('flipped')
    ) return;
    cardFlipped = false;
    color2 = card2.classList[0];
    // console.log('Color 2: ', color2);
    if (color1 === color2) {
      card1.classList.add('open');
      card2.classList.add('open');
    } else {
      canClick = false;
      // console.log('canClick: ', canClick)
      setTimeout(clearColors, 1000);
    }
    color1 = '';
    color2 = '';
    card1.classList.remove('flipped');
  }
})