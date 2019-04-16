let hero = {};

const map = {
  rows: 0,
  columns: 0,
  tiles: [],
  sprites: []
};

let movementLock = false;

const generateHpBar = function (sprite) {
  const hpBar = $('<div></div>');
  hpBar.addClass('hp-bar');
  hpBar.text(sprite.stats.healingPoints + '/' + sprite.stats.vitality);
  const hpPercentage = sprite.stats.healingPoints * 100 / sprite.stats.vitality;
  const fullPercentage = 100 - hpPercentage;
  hpBar.css({
    background: `linear-gradient(90deg, rgba(255, 0, 43, 0.5) ${hpPercentage}%, rgba(0, 255, 255, 0) ${fullPercentage}%)`
  });

  return hpBar;
}

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

        if (sprite.type !== 'health-potion' && sprite.type !== 'chest-closed') {
          const hpBar = generateHpBar(sprite);
          spriteElement.append(hpBar);
        }

        const row = sprite.position[0];
        const column = sprite.position[1];
        if (map.sprites[row] === undefined) {
          map.sprites[row] = [];
        }

        map.tiles[row][column].append(spriteElement);
        sprite.spriteElement = spriteElement;
        map.sprites[row][column] = sprite;

        if (sprite.type === 'hero') {
          hero = sprite;
          hero.position = {};
          hero.position.row = row;
          hero.position.column = column;
          $('#row').text(row);
          $('#column').text(column);
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

  if (map.sprites[hero.position.row] && map.sprites[hero.position.row][hero.position.column]) {
    if (map.sprites[hero.position.row][hero.position.column].type === 'health-potion') {
      const healthPotion = map.sprites[hero.position.row][hero.position.column];
      hero.stats.healingPoints += healthPotion.stats.healingPoints;
      if (hero.stats.healingPoints > hero.stats.vitality) {
        hero.stats.healingPoints = hero.stats.vitality;
      }
      const newHpBar = generateHpBar(hero);
      hero.spriteElement.html(newHpBar);
      healthPotion.spriteElement.remove();
      delete map.sprites[hero.position.row][hero.position.column];
    }
  }
}

function handleKeyboardPress(event) {
  if (movementLock === false) {
    switch (event.which) {
      case 37: // left
        if (hero.position.column > 0) {
          const leftElement = map.tiles[hero.position.row][hero.position.column - 1];
          if (leftElement.hasClass('tile-disabled') === false) { //
            moveHero('left', -1);
          }
        }
        break;

      case 38: // up
        if (hero.position.row >= 1) {
          const upperElement = map.tiles[hero.position.row - 1][hero.position.column];

          if (upperElement.hasClass('tile-disabled') === false) {
            moveHero('top', -1);
          }
        }
        break;
      case 39: // right
        const rightElement = map.tiles[hero.position.row][hero.position.column + 1];
        if (hero.position.column < map.columns && rightElement.hasClass('tile-disabled') === false) {
          moveHero('left', 1);
        }
        break;

      case 40: // down
        // jos maresc topul
        const downElement = map.tiles[hero.position.row + 1][hero.position.column];

        if (hero.position.row < map.rows && downElement.hasClass('tile-disabled') === false) {
          moveHero('top', 1);
        }
        break;

      default: console.log(event.which); // exit this handler for other keys
    }
  }
  event.preventDefault(); // prevent the default action (scroll / move caret)
}

$(document).keydown(handleKeyboardPress);
