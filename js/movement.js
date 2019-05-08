let movementLock = false;

/**
 * @param {*} direction - are valoarea ori top ori left
 * @param {*} step - are valoarea ori 1 ori -1
 */
function moveHero(direction, step) {
  movementLock = true;
  const numberOfPixels = 64;
  let stepSign = '-';
  if (step > 0) {
    stepSign = '+';
  }

  // -=64px sau +=64px
  const directionValue = stepSign + "=" + numberOfPixels + "px";

  $("#adventurer").animate({ [direction]: directionValue }, 200, function () {
    // codul se executa cand se termina animatia
    movementLock = false;
    updateCoordinates(direction, step);
    updateMapOpacity(hero);
    showNextDialogIfAvailable(hero.position.row, hero.position.column);
  });
}

function canHeroMove(nextElement) {
  if (movementLock === true) {
    return false;
  }

  if (!nextElement || nextElement.hasClass('tile-disabled') === false) {
    return false;
  }

  return true;
}

function handleKeyboardPress(event) {
  switch (event.which) {
    case 32: // space
      movementLock = false;
      showNextDialogIfAvailable(hero.position.row, hero.position.column);
      break;
    case 37: // left
      if (hero.position.column > 0) {
        if (canHeroMove(map.tiles[hero.position.row][hero.position.column - 1])) {
          moveHero('left', -1);
        }
      }
      break;

    case 38: // up
      if (hero.position.row >= 1) {
        if (canHeroMove(map.tiles[hero.position.row - 1][hero.position.column])) {
          moveHero('top', -1);
        }
      }
      break;
    case 39: // right
      if (map.tiles[hero.position.row][hero.position.column + 1] &&
        canHeroMove(map.tiles[hero.position.row][hero.position.column + 1])) {
        moveHero('left', 1);
      }
      break;

    case 40: // down
      // jos maresc topul
      if (map.tiles[hero.position.row + 1] &&
        canHeroMove(map.tiles[hero.position.row + 1][hero.position.column])) {
        moveHero('top', 1);
      }
      break;

    default: console.log(event.which); // exit this handler for other keys
  }
  event.preventDefault(); // prevent the default action (scroll / move caret)
}

$(document).keydown(handleKeyboardPress);
