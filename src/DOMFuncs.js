const createHundred = function (gridElem, func) {
  let newElem;
  let i;
  for (i = 0; i < 100; i++) {
    newElem = document.createElement("div");
    newElem.classList.add("tile");
    newElem.addEventListener("click", func)
    gridElem.appendChild(newElem);
  }
};

const displayShips = function (playerBoard, playerGrid) {
  const shipTiles = playerBoard.computeTakenTiles();
  let tile;
  for (tile of shipTiles) {
    playerGrid.children[tile - 1].classList.add("ship");
  }
};

const displayHits = function (playerBoard, playerGrid, compBoard, compGrid) {
  let playerHit = [];
  let i;
  for (i = 0; i < 100; i++) {
    if (playerBoard.hit[i]) {
      playerHit.push(i + 1);
    }
  }
  let compHit = [];
  for (i = 0; i < 100; i++) {
    if (compBoard.hit[i]) {
      compHit.push(i + 1);
    }
  }

  let hitTile;
  for (hitTile of playerHit) {
    playerGrid.children[hitTile - 1].classList.add("hit");
  }

  for (hitTile of compHit) {
    compGrid.children[hitTile - 1].classList.add("hit");
  }
};

const resetGrid = function (playerGrid, compGrid) {
  let tile;
  for (tile of playerGrid.childNodes) {
    tile.classList.remove("ship");
    tile.classList.remove("hit");
  }
  for (tile of compGrid.childNodes) {
    tile.classList.remove("ship");
    tile.classList.remove("hit");
  }
};


export { createHundred, displayHits, displayShips, resetGrid };
