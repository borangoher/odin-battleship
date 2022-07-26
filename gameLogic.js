const createGameboard = require("./boardFactory");
const createShip = require("./shipFactory");

let iterPlayer = 0;
let currentAlingment = "ns";
let playerBoard = createGameboard();
let compBoard = createGameboard();

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

const placeShipPlayer = function (num) {
    const newTiles = computeTilesToTake(getShipLength(iterPlayer), num, currentAlingment);
    const oldTiles = playerBoard.computeTakenTiles();
    const intersects = newTiles.some((num) => oldTiles.includes(num));
    if (intersects) {
        alert("You can't place intersecting ships!");
    } else {
        const newShip = createShip(getShipLength(iterPlayer), num, currentAlingment);
        playerBoard.placeShip(newShip, num, currentAlingment);
        iterPlayer++;
    }

    if (iterPlayer === 10) {
        swapEventListeners();
    }
};

const swapEventListeners = function () {
    //swap ship placement for missile hitting
}