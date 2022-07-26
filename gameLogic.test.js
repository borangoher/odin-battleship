const createGameboard = require("./boardFactory")
const createShip = require("./shipFactory")


test("creates ship with correct attr.", () => {
    let testShip = createShip(length=4, hitSpots=2, isSunk=false);
    expect(testShip.length).toBe(4);
    expect(testShip.hitSpots).toBe(2);
    expect(testShip.isSunk).toBe(false);
});

test("correctly increments hit spot number", () => {
    let testShip = createShip(length=4, hitSpots=2, isSunk=false);
    testShip.hit();
    expect(testShip.hitSpots).toBe(3);
});

test("correctly implements sinking logic", () => {
    let testShip = createShip(length=4, hitSpots=2, isSunk=false);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk).toBe(true);
});

test("ship placements works", () => {
    let gameboard = createGameboard();
    let newShip = createShip(length=4);
    gameboard.placeShip(newShip, 16, "ns");
    expect(gameboard.ships[0].ship.length).toBe(4);
    expect(gameboard.ships[0].ship.hitSpots).toBe(0);
    expect(gameboard.ships[0].ship.isSunk).toBe(false);
    expect(gameboard.ships[0].tile).toBe(16);
    expect(gameboard.ships[0].alignment).toBe("ns");
});

test("computes taken tiles correctly", () => {
    let gameboard = createGameboard();
    let newShip1 = createShip(4);
    let newShip2 = createShip(3);
    gameboard.placeShip(newShip1,16,"ns"); //16 26 36 46
    gameboard.placeShip(newShip2,72,"we"); //72 73 74
    expect(gameboard.computeTakenTiles()).toStrictEqual([16, 26, 36, 46, 72, 73, 74]);
});

test.only("can hit ship through board", () => {
    let gameboard = createGameboard();
    let newShip = createShip(4);
    gameboard.placeShip(newShip, 4, "ns");
    gameboard.hitBoard(14);
    expect(gameboard.ships[0].hitSpots).toBe(1); //is actually 1 but recieves undefined????
})