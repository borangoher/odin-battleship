const shipFuncs = {
  hit() {
    if (this.hitSpots < this.length) {
      this.hitSpots += 1;
      if (this.hitSpots === this.length) {
        this.isSunk = true;
      }
    }
  },
};

const createShip = function (length, hitSpots = 0, isSunk = false) {
  let ship = Object.create(shipFuncs);
  ship.length = length;
  ship.hitSpots = hitSpots;
  ship.isSunk = isSunk;

  return ship;
};

module.exports = createShip;
