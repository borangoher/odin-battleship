const createHundred = function (gridElem) {
    let newElem;
    for (let i = 0; i < 100; i++) {
        newElem = document.createElement("div")
        newElem.classList.add("tile")
        gridElem.appendChild(newElem)
    }
}

const displayShips = function (playerBoard, playerGrid) {
    const shipTiles = playerBoard.computeTakenTiles();
    for (tile in shipTiles) {
        playerGrid.nthChild(tile).classList.add("ship");
    }
}

const displayHits = function (playerBoard, playerGrid, compBoard, compGrid) {
    let playerHit = [];
    for (i=0;i<100;i++) {
        if (playerBoard.hit[i]) {
            playerHit.push(i+1);
        }
    }
    let compHit = [];
    for (i=0;i<100;i++) {
        if (compBoard.hit[i]) {
            compHit.push(i+1);
        }
    }
}