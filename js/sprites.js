let hero = {};

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

function updateHeroHpBar() {
  const newHpBar = generateHpBar(hero);
  hero.spriteElement.html(newHpBar);
}

function generateSprites() {
  $.ajax({
    url: "api/scenario/sprites.json"
  }).done(function (spritesData) {
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
        updateHeroStats();
      }
    })
  });
}
