let movementLock = false;

/**
 * @param {*} direction - are valoarea ori top ori left
 * @param {*} step - are valoarea ori 1 ori -1
 */
function moveHero(direction, step) {
  movementLock = true;
  const numberOfPixels = 64;
  let stepSign = "-";
  if (step > 0) {
    stepSign = "+";
  }


  // -=64px sau +=64px
  const directionValue = stepSign + "=" + numberOfPixels + "px";

  $("#adventurer").animate({ [direction]: directionValue }, 200, function() {
    // codul se executa cand se termina animatia
    movementLock = false;
    updateCoordinates(direction, step);
    handleSpotLight();
    handleDialog();

  });
}

function handleSpotLight() {
  map.tiles.forEach((rows, rowIndex) => {
    rows.forEach((tile, columnIndex) => {
      let distance =
        Math.abs(rowIndex - hero.position.row) +
        Math.abs(columnIndex - hero.position.column);
      let opacity = 1 - distance * 0.3;

      // hero is always visible 100%
      if (
        hero.position.row === rowIndex &&
        hero.position.column === columnIndex
      ) {
        opacity = 1;
      }
      tile.css({ opacity });
    });
  });
}

function handleKeyboardPress(event) {



  if (movementLock === false) {
    switch (event.which) {
      case 37: // left
        if (hero.position.column > 0) {
          const leftElement =
            map.tiles[hero.position.row][hero.position.column - 1];
          if (leftElement.hasClass("tile-disabled") === false) {
            //
            moveHero("left", -1);
          }
        }
        break;

      case 38: // up
        if (hero.position.row >= 1) {
          const upperElement =
            map.tiles[hero.position.row - 1][hero.position.column];

          if (upperElement.hasClass("tile-disabled") === false) {
            moveHero("top", -1);
          }
        }
        break;
      case 39: // right
        const rightElement =
          map.tiles[hero.position.row][hero.position.column + 1];
        if (
          hero.position.column < map.columns &&
          rightElement.hasClass("tile-disabled") === false
        ) {
          moveHero("left", 1);
        }
        break;

      case 40: // down
        // jos maresc topul
        const downElement =
          map.tiles[hero.position.row + 1][hero.position.column];

        if (
          hero.position.row < map.rows &&
          downElement.hasClass("tile-disabled") === false
        ) {
          moveHero("top", 1);
        }
        break;

      default:
        console.log(event.which); // exit this handler for other keys
    }
  }
  event.preventDefault(); // prevent the default action (scroll / move caret)
}

$(document).keydown(handleKeyboardPress);
