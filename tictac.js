'use strict';

//selecting elements
const topLeftEl = document.querySelector('.btn--TopLeft');
const topMiddleEl = document.querySelector('.btn--TopMiddle');
const topRightEl = document.querySelector('.btn--TopRight');
const middleLeftEl = document.querySelector('.btn--MiddleLeft');
const middleMiddleEl = document.querySelector('.btn--MiddleMiddle');
const middleRightEl = document.querySelector('.btn--MiddleRight');
const bottomLeftEl = document.querySelector('.btn--BottomLeft');
const bottomMiddleEl = document.querySelector('.btn--BottomMiddle');
const bottomRightEl = document.querySelector('.btn--BottomRight');
const newGameEl = document.querySelector('.btn--New');
const botGameEl = document.querySelector('.btn--Bot');
const clearScoreEl = document.querySelector('.btn--clear');
const playerXEl = document.querySelector('.player--x');
const playerOEl = document.querySelector('.player--o');
const scoreXEl = document.getElementById('score--0');
const scoreOEl = document.getElementById('score--1');
const nameOEl = document.getElementById('name--1');
const currentEl = document.getElementById('currentPlayer');
const winMsg = document.getElementById('winMessage');

const elementsArray = [
  topLeftEl,
  topMiddleEl,
  topRightEl,
  middleLeftEl,
  middleMiddleEl,
  middleRightEl,
  bottomLeftEl,
  bottomMiddleEl,
  bottomRightEl,
];

const scores = [0, 0];
let currentPlayer = 0;
let activePlayer = 0;
let botPlay = false;
let winner = false;

const updated = [1, 1, 1, 1, 1, 1, 1, 1, 1];
const win = [0, 0, 0, 0, 0, 0, 0, 0, 0];
scoreXEl.textContent = 0;
scoreOEl.textContent = 0;
playerOEl.classList.remove('player--active');

function endGame() {
  console.log('END GAME!');
  for (let i = 0; i < elementsArray.length; i++) {
    console.log(`Elements are ${elementsArray[i]}`);
    elementsArray[i].classList.add('no-click');
  }
  winner = true;
}

function newGame() {
  console.log('NEW GAME!');
  for (let i = 0; i < elementsArray.length; i++) {
    console.log(`Elements are ${elementsArray[i]}`);
    elementsArray[i].classList.remove('no-click');
    elementsArray[i].classList.remove('classX');
    elementsArray[i].classList.remove('classO');
  }

  winMsg.textContent = '';
  //resets both the win and updated values to org
  for (let i = 0; i < updated.length; i++) {
    updated[i] = 1;
    win[i] = 0;
  }
  currentPlayer = 0;
  activePlayer = 0;
  winner = false;
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0; //switch from 0 to one
  playerXEl.classList.toggle('player--active');
  playerOEl.classList.toggle('player--active');
}

function addScore(letter) {
  if (letter === 'x') {
    //x wins
    scores[0] += 1;
    winMsg.textContent = 'X WINS!';
  } else {
    //O wins
    scores[1] += 1;
    winMsg.textContent = 'O WINS!';
  }
  endGame();
  scoreXEl.textContent = scores[0];
  scoreOEl.textContent = scores[1];
}

function evalWin(letter) {
  console.log(`win array ${win}`);
  if (win[0] === letter && win[1] === letter && win[2] === letter) {
    //win
    addScore(letter);
  } else if (win[0] === letter && win[3] === letter && win[6] === letter) {
    //win
    addScore(letter);
  } else if (win[0] === letter && win[4] === letter && win[8] === letter) {
    //win
    addScore(letter);
  } else if (win[8] === letter && win[7] === letter && win[6] === letter) {
    //win
    addScore(letter);
  } else if (win[8] === letter && win[5] === letter && win[2] === letter) {
    //win
    addScore(letter);
  } else if (win[2] === letter && win[4] === letter && win[6] === letter) {
    addScore(letter);
  } else if (win[1] === letter && win[4] === letter && win[7] === letter) {
    addScore(letter);
  } else if (win[3] === letter && win[4] === letter && win[5] === letter) {
    addScore(letter);
  } else {
    const typeArray = [];
    let integers = 0;
    //converts win array to typeof to determine if it is a string or integer
    for (let i = 0; i < win.length; i++) {
      typeArray.push(typeof win[i]);
    }
    //count number of integerins in type array
    for (let i = 0; i < typeArray.length; i++) {
      if (typeArray[i] !== 'string') {
        integers++;
      }
    }
    if (integers === 0) {
      //oinly strings areleft and no win senario occured
      //DRAW!
      winMsg.textContent = 'DRAW';
      endGame();
    }
  }
}

function setWinIndex(index, updatedValue, select) {
  let winletter = 'A';
  if (updated[index] === 1) {
    if (activePlayer === 0) {
      //sets sqaure to be x and stores value
      winletter = 'x';
      select.classList.add('classX');
      select.classList.add('no-click');
    } else {
      //sets square to be o and stores value
      winletter = 'o';
      select.classList.add('classO');
      select.classList.add('no-click');
    }
    win[index] = winletter;
    updated[index] = updatedValue; //updated
    evalWin(winletter); //checks if the last play was a winner
  } else {
    //need to pick a new square as that is taken Not needed anymore with no-click class
    window.alert('Square is already taken please choose another square!');
  }
}

function randomArrayCreate() {
  const randomArray = [];

  for (let i = 0; i < updated.length; i++) {
    if (updated[i] === 1) {
      randomArray.push(i); //gets index value of updated array 1 position
    }
  }
  return randomArray;
}

function botNoClick() {
  let noClickArray = randomArrayCreate();
  for (let i = 0; i < noClickArray.length; i++) {
    elementsArray[noClickArray[i]].classList.add('no-click');
  }
}

function botClick() {
  let clickArray = randomArrayCreate();
  for (let i = 0; i < clickArray.length; i++) {
    elementsArray[clickArray[i]].classList.remove('no-click');
  }
}

function bot() {
  let botRandomSelectArray = randomArrayCreate();
  let randomPos =
    botRandomSelectArray[
      Math.floor(Math.random() * botRandomSelectArray.length)
    ]; //out of the array
  setWinIndex(randomPos, 0, elementsArray[randomPos]);
  botClick();
  switchPlayer();
}

function evalPosition(Position) {
  setWinIndex(Position, 0, elementsArray[Position]);
  switchPlayer();
  if (botPlay && winner === false) {
    botNoClick();
    setTimeout(bot, 1000);
  }
}
//Handled event listeners
topLeftEl.addEventListener('click', function () {
  evalPosition(0);
});

topMiddleEl.addEventListener('click', function () {
  evalPosition(1);
});

topRightEl.addEventListener('click', function () {
  evalPosition(2);
});

middleLeftEl.addEventListener('click', function () {
  evalPosition(3);
});

middleMiddleEl.addEventListener('click', function () {
  evalPosition(4);
});

middleRightEl.addEventListener('click', function () {
  evalPosition(5);
});

bottomLeftEl.addEventListener('click', function () {
  evalPosition(6);
});

bottomMiddleEl.addEventListener('click', function () {
  evalPosition(7);
});

bottomRightEl.addEventListener('click', function () {
  evalPosition(8);
});

newGameEl.addEventListener('click', function () {
  newGame();
});

botGameEl.addEventListener('click', function () {
  if (botPlay) {
    botPlay = false;
    window.alert('The Bot says goodbye...');
    nameOEl.textContent = 'Player O';
  } else {
    botPlay = true;
    window.alert('Playing with Bot!');
    nameOEl.textContent = 'BOT 🤖';
  }
});

clearScoreEl.addEventListener('click', function () {
  scores[0] = 0;
  scores[1] = 0;
  scoreXEl.textContent = scores[0];
  scoreOEl.textContent = scores[1];
});
