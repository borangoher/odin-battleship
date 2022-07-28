import {
  createHundred,
  displayHits,
  displayShips,
  resetGrid,
} from "./DOMFuncs.js";
import { createGameboard } from "./boardFactory.js";
import { createShip } from "./shipFactory.js";

let iterPlayer = 0;
let currentAlignment = "ns";
let playerBoard = createGameboard();
let compBoard = createGameboard();
let currentTurn = "player";

let playerGrid = document.getElementById("player-grid");
let compGrid = document.getElementById("comp-grid");
const messageBox = document.getElementById("message");
const startButton = document.getElementById("start-game");
const resetButton = document.getElementById("reset-game");
const alignButton = document.getElementById("align");

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
  let i;
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
    currentAlignment
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
    boardTaken.placeShip(newShip, num, currentAlignment);
    iterPlayer++;
  }
  return boardTaken;
};

const initCompBoard = function () {
  iterPlayer = 0;
  while (iterPlayer < 10) {
    if (Math.random() > 0.5) {
      currentAlignment = "ns";
    } else {
      currentAlignment = "we";
    }
    compBoard = placeShipOnBoard(compBoard, Math.ceil(Math.random() * 100));
  }
  iterPlayer = 0;
};

const swapEventListeners = function (playerGrid, compGrid) {
  let tile;
  for (tile of playerGrid.children) {
    tile.replaceWith(tile.cloneNode(true));
  }

  for (tile of compGrid.children) {
    tile.replaceWith(tile.cloneNode(true));
  }

  for (tile of compGrid.children) {
    tile.addEventListener("click", function () {
      hitEvent(
        Array.from(event.currentTarget.parentNode.children).indexOf(
          event.currentTarget
        ) + 1
      );
    });
  }
};

const placeShipEvent = function (tileClicked) {
  playerBoard = placeShipOnBoard(playerBoard, tileClicked);
};

const hitEvent = function (tileClicked) {
  let curHitCount = 0;
  let nextHitCount = 0;
  let ship;
  for (ship of compBoard.ships) {
    curHitCount += ship.ship.hitSpots;
  }
  try {
    compBoard.hitBoard(tileClicked);
    currentTurn = "comp";
    playerBoard.hitBoard(Math.ceil(Math.random() * 100));

    for (ship of compBoard.ships) {
      nextHitCount += ship.ship.hitSpots;
    }
    if (nextHitCount > curHitCount) {
      messageBox.innerHTML = "Hit!"
    } else {
      messageBox.innerHTML = "Miss."
    }

    if (compBoard.checkDefeat()) {
      messageBox.innerHTML = "You won!";
    } else if (playerBoard.checkDefeat()) {
      messageBox.innerHTML = "You lost.";
    }
  } catch {
    currentTurn = "player";
  } finally {
    displayHits(playerBoard, playerGrid, compBoard, compGrid);
  }
};

const initGame = function () {
  if (iterPlayer === 10) {
    initCompBoard();
    swapEventListeners(playerGrid, compGrid);
    displayShips(playerBoard, playerGrid);
    messageBox.innerHTML = "Game start!";
  } else {
    messageBox.innerHTML = "Place your ships first";
  }
};

const resetGame = function () {
  playerBoard = createGameboard();
  compBoard = createGameboard();
  iterPlayer = 0;
  currentAlignment = "ns";
  currentTurn = "player";
  messageBox.innerHTML = "Place your ships!";

  playerGrid.replaceWith(playerGrid.cloneNode(false));
  compGrid.replaceWith(compGrid.cloneNode(false));
  playerGrid = document.getElementById("player-grid");
  compGrid = document.getElementById("comp-grid");
  createHundred(playerGrid, function () {
    if (iterPlayer < 10) {
      placeShipEvent(
        Array.from(event.currentTarget.parentNode.children).indexOf(
          event.currentTarget
        ) + 1
      );
      displayShips(playerBoard, playerGrid);
    }
  });
  createHundred(compGrid, function () {});
};

const changeAlignment = function () {
  currentAlignment === "ns"
    ? (currentAlignment = "we")
    : (currentAlignment = "ns");
};

createHundred(playerGrid, function () {
  if (iterPlayer < 10) {
    placeShipEvent(
      Array.from(event.currentTarget.parentNode.children).indexOf(
        event.currentTarget
      ) + 1
    );
    displayShips(playerBoard, playerGrid);
  }
});
createHundred(compGrid, function () {});
startButton.addEventListener("click", initGame);
resetButton.addEventListener("click", resetGame);
alignButton.addEventListener("click", changeAlignment);

export { placeShipOnBoard };
