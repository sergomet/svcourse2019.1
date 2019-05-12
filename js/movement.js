function handleKeyboardPress(event) {
  switch (event.which) {
    case 32: // space
      hero.movementLock = false;
      dialogs.showNextIfAvailable(hero.row, hero.column);
      break;
    case 37: // left
      if (hero.column > 0) {
        if (hero.canMove(map.tiles[hero.row][hero.column - 1])) {
          hero.move("left", -1);
        }
      }
      break;

    case 38: // up
      if (hero.row >= 1) {
        if (hero.canMove(map.tiles[hero.row - 1][hero.column])) {
          hero.move("top", -1);
        }
      }
      break;
    case 39: // right
      if (
        map.tiles[hero.row][hero.column + 1] &&
        hero.canMove(map.tiles[hero.row][hero.column + 1])
      ) {
        hero.move("left", 1);
      }
      break;

    case 40: // down
      // jos maresc topul
      if (
        map.tiles[hero.row + 1] &&
        hero.canMove(map.tiles[hero.row + 1][hero.column])
      ) {
        hero.move("top", 1);
      }
      break;

    default:
      console.log(event.which); // exit this handler for other keys
  }
  event.preventDefault(); // prevent the default action (scroll / move caret)
}

$(document).keydown(handleKeyboardPress);
