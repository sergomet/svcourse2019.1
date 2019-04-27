initMap(generateSprites);

function updateHeroStats() {
  $("#strength").text(hero.stats.strength);
  $("#vitality").text(hero.stats.healingPoints + "/" + hero.stats.vitality);
  updateHeroHpBar();
}

function updateCoordinates(direction, step) {
  let coordinateName;

  if (direction === "top") {
    coordinateName = "row";
  } else {
    coordinateName = "column";
  }

  hero.position[coordinateName] += step;

  $("#" + coordinateName).text(hero.position[coordinateName]);

  checkTileActions();
}
