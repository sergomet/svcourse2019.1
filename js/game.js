const hero = {
  visible: true,
  position: {
    row: 0,
    column: 0
  }
}

const map = {
  rows: 0,
  columns: 0,
  tiles: []
};

let movementLock = false;

function generateSprites() {
  $.ajax({
    url: "api/scenario/sprites.json"
  })
    .done(function (spritesData) {
      spritesData.forEach(function (sprite, spriteIndex) {
        const spriteElement = $('<div></div>');
        spriteElement.addClass('sprite');
        spriteElement.addClass(sprite.type);
        spriteElement.attr('id', sprite.id);
        const row = sprite.position[0];
        const column = sprite.position[1];
        map.tiles[row][column].append(spriteElement);
        if (sprite.type === 'hero') {
          hero.position.row = row;
          hero.position.column = column;
        }
      })
    });
}

$.ajax({
  url: "api/scenario/map.json"
})
  .done(function (data) {

    map.rows = data.map.length - 1;

    const mapElement = $('#mapContent');
    const mapArrayLength = data.map.length;

    for (let rowIndex = 0; rowIndex < mapArrayLength; rowIndex++) {
      map.tiles.push([]); //map.tiles[rowIndex] = [];
      const rowArray = data.map[rowIndex];
      const rowElement = $("<div class='row'></div>");
      mapElement.append(rowElement);
      map.columns = rowArray.length - 1;
      for (let columnIndex = 0; columnIndex < rowArray.length; columnIndex++) {
        const tileElement = $("<div class='tile'></div>");
        tileElement.addClass(rowArray[columnIndex]);
        rowElement.append(tileElement);
        map.tiles[rowIndex].push(tileElement);
      }
    }
    generateSprites();
  });

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
  });
}

function updateCoordinates(direction, step) {
  let coordinateName;

  if (direction === 'top') {
    coordinateName = 'row';
  } else {
    coordinateName = 'column';
  }

  hero.position[coordinateName] += step;
  $("#" + coordinateName).text(hero.position[coordinateName]);
}

function handleKeyboardPress(event) {
  if (movementLock === false) {
    switch (event.which) {
      case 37: // left
        const leftElement = map.tiles[hero.position.row][hero.position.column - 1];
        if (hero.position.column > 0 && leftElement.hasClass('tile-disabled') === false) { //
          moveHero('left', -1);
        }
        break;

      case 38: // up
        const upperElement = map.tiles[hero.position.row - 1][hero.position.column];
        if (hero.position.row > 0 && upperElement.hasClass('tile-disabled') === false) {
          moveHero('top', -1);
        }
        break;

      case 39: // right
        if (hero.position.column < map.columns) {
          moveHero('left', 1);
        }
        break;

      case 40: // down
        // jos maresc topul
        if (hero.position.row < map.rows) {
          moveHero('top', 1);
        }
        break;

      default: console.log(event.which); // exit this handler for other keys
    }
  }
  event.preventDefault(); // prevent the default action (scroll / move caret)
}

$(document).keydown(handleKeyboardPress);
