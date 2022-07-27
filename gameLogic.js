const createGameboard = require("./boardFactory");
const createShip = require("./shipFactory");

let iterPlayer = 0;
let currentAlingment = "ns";
let playerBoard = createGameboard();
let compBoard = createGameboard();
let currentTurn = "player";

const getShipLength = function (iter) {
  let len = 1;
  switch (iter) {
    case 0:
      len = 4;
      break;
    case 1:
    case 2:
      len = 3;
      break;
    case 3:
    case 4:
    case 5:
      len = 2;
      break;
    case 6:
    case 7:
    case 8:
    case 9:
      len = 1;
      break;
  }

  return len;
};

const computeTilesToTake = function (length, tile, alignment) {
  let arr = new Array(0);
  if (alignment === "ns") {
    for (i = 0; i < length; i++) {
      arr.push(tile + 10 * i);
    }
  } else {
    for (i = 0; i < length; i++) {
      arr.push(tile + i);
    }
  }

  return arr;
};

const placeShipOnBoard = function (boardTaken, num) {
  const newTiles = computeTilesToTake(
    getShipLength(iterPlayer),
    num,
    currentAlingment
  );
  const oldTiles = boardTaken.computeTakenTiles();
  const intersects = newTiles.some(function (num) {
    return oldTiles.includes(num) || num > 100;
  });
  if (intersects) {
    if (boardTaken !== compBoard) {
      alert("You can't place intersecting/out of boardships!");
    }
  } else {
    const newShip = createShip(getShipLength(iterPlayer));
    boardTaken.placeShip(newShip, num, currentAlingment);
    iterPlayer++;
  }

  if (iterPlayer === 10) {
    swapEventListeners();
  }

  return boardTaken;
};

const initCompBoard = function () {
  iterPlayer = 0;
  while (iterPlayer < 10) {
    if (Math.random() > 0.5) {
      currentAlingment = "ns";
    } else {
      currentAlingment = "we";
    }
    compBoard = placeShipOnBoard(compBoard, Math.ceil(Math.random() * 100));
  }
  iterPlayer = 0;
};

const swapEventListeners = function () {
  //swap ship placement for missile hitting
};

const placeShipEvent = function (tileClicked) {
  playerBoard = placeShipOnBoard(playerBoard, tileClicked);
};

const hitEvent = function (tileClicked) {
  try {
    compBoard.hitBoard(tileClicked);
    currentTurn = "comp";
  } catch {
    currentTurn = "player";
  }
};

const initGame = function () {
  initCompBoard();
  while (iterPlayer < 10) {}
  //message = game start
};

const startNewGameEvent = function () {
  initGame();
  while (!(playerBoard.checkDefeat() || compBoard.checkDefeat())) {
    while (currentTurn === "player") {
      //message = hit your opponent
    }
    playerBoard.hitBoard(Math.ceil(Math.random() * 100));
  }

  if (compBoard.checkDefeat()) {
    //message = you won
  } else {
    //message = you lost
  }
};

console.log("hello");
initCompBoard();
hitEvent(45);
hitEvent(45);
module.exports = placeShipOnBoard;
