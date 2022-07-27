const createGameboard = function () {
  const computeTakenTiles = function () {
    let arr = new Array(0);
    for (const ship of this.ships) {
      if (ship.alignment === "ns") {
        for (i = 0; i < ship.ship.length; i++) {
          arr.push(ship.tile + 10 * i);
        }
      } else {
        for (i = 0; i < ship.ship.length; i++) {
          arr.push(ship.tile + i);
        }
      }
    }

    return arr;
  };
  const placeShip = function (shipObject, tile, alignment) {
    this.ships.push({
      ship: shipObject,
      tile: tile,
      alignment: alignment,
    });
  };

  const hitBoard = function (tile) {
    if (this.hit[tile - 1] !== true) {
      const takenTiles = this.computeTakenTiles();
      if (takenTiles.includes(tile)) {
        const ind = takenTiles.indexOf(tile);
        const shipInd = indToInd(ind);
        this.ships[shipInd].ship.hit();
        this.hit[tile - 1] = true;
      } else {
        this.hit[tile - 1] = true;
      }
    } else {
      throw new Error("AAAAAA");
    }
  };

  const checkDefeat = function () {
    let count = 0;
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].ship.isSunk) {
        count++;
      }
    }
    if ((count === this.ships.length)) {
      return true;
    } else {
      return false;
    }
  };

  return {
    ships: new Array((arrayLength = 0)),
    hit: new Array(100),
    placeShip,
    computeTakenTiles,
    hitBoard,
    checkDefeat,
  };
};

const indToInd = function (ind) {
  if (ind <= 3) {
    return 0;
  } else if (ind <= 6) {
    return 1;
  } else if (ind <= 9) {
    return 2;
  } else if (ind <= 11) {
    return 3;
  } else if (ind <= 13) {
    return 4;
  } else if (ind <= 15) {
    return 5;
  } else if (ind <= 16) {
    return 6;
  } else if (ind <= 17) {
    return 7;
  } else if (ind <= 18) {
    return 8;
  } else if (ind <= 19) {
    return 9;
  }
};

module.exports = createGameboard;
