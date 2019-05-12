function attackMonster(monster) {
  if (hero.stats.strength >= monster.stats.healingPoints) {
    hero.stats.healingPoints -= Math.floor(monster.stats.strength / 2);
    monster.stats.healingPoints = 0;
  } else {
    monster.stats.healingPoints -= hero.stats.strength;

    if (monster.stats.healingPoints > 0) {
      hero.stats.healingPoints -= monster.stats.strength;
    }
  }

  if (hero.stats.healingPoints <= 0) {
    alert("The hero has died, you suck at gaming.");
    window.location.reload();
  } else {
    monster.element.remove();
    delete map.sprites[monster.row][monster.column];
    hero.updateStats();
  }

  if (hero.stats.healingPoints > 0 && monster.stats.healingPoints > 0) {
    attackMonster(monster);
  }
}

function drinkPotion(potionSprite) {
  hero.stats.healingPoints += potionSprite.stats.healingPoints;
  if (hero.stats.healingPoints > hero.stats.vitality) {
    hero.stats.healingPoints = hero.stats.vitality;
  }
  hero.updateStats();
  potionSprite.element.remove();
  delete map.sprites[hero.position.row][hero.position.column];
}

function openChest(chestSprite) {
  hero.stats.healingPoints += chestSprite.stats.healingPoints;
  hero.stats.strength += chestSprite.stats.strength; // hero.stats.strength = hero.stats.strength + chestSprite.stats.strength
  hero.stats.vitality += chestSprite.stats.vitality;

  if (hero.stats.healingPoints > hero.stats.vitality) {
    hero.stats.healingPoints = hero.stats.vitality;
  }

  chestSprite.element.removeClass("chest-closed");
  chestSprite.element.addClass("chest-open");

  const heroNewCss = {
    "animation-name": "hero-stand-by-sword"
  };
  hero.element.css(heroNewCss);

  delete map.sprites[hero.position.row][hero.position.column];
  hero.updateStats();
}

function checkTileActions() {
  if (map.sprites[hero.row] && map.sprites[hero.row][hero.column]) {
    const currentSprite = map.sprites[hero.row][hero.column];

    switch (currentSprite.type) {
      case "health-potion":
        drinkPotion(currentSprite);
        break;
      case "chest-closed":
        openChest(currentSprite);
        break;
      case "bat":
      case "vilain":
        attackMonster(currentSprite);
        break;
    }
  }
}
