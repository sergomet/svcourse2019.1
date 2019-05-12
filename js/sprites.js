class Sprite {
  constructor(data) {
    this.row = data.position[0];
    this.column = data.position[1];
    this.type = data.type;
    this.element = null;
    this.id = data.id;

    this.build();
  }

  build() {
    this.element = $("<div></div>");
    this.element.addClass("sprite");
    this.element.addClass(this.type);
    this.element.attr("id", this.id);
  }
}

class MonsterSprite extends Sprite {
  constructor(data) {
    super(data);

    console.dir(data);

    this.stats = data.stats;
    const hpBar = this.generateHpBar();
    this.element.append(hpBar);
  }

  generateHpBar() {
    const hpBar = $("<div></div>");
    hpBar.addClass("hp-bar");
    hpBar.text(this.stats.healingPoints + "/" + this.stats.vitality);
    const hpPercentage = (this.stats.healingPoints * 100) / this.stats.vitality;
    const fullPercentage = 100 - hpPercentage;
    hpBar.css({
      background: `linear-gradient(90deg, rgba(255, 0, 43, 0.5) ${hpPercentage}%, rgba(0, 255, 255, 0) ${fullPercentage}%)`
    });

    return hpBar;
  }
}

class HeroSprite extends MonsterSprite {
  constructor(data) {
    super(data);

    this.movementLock = false;

    this.position = {
      row: this.row,
      column: this.column
    };

    $("#row").text(this.row);
    $("#column").text(this.column);
    this.updateStats();
    map.updateMapOpacity(this);
    $("body").prepend(this.element);
    const { top, left } = map.tiles[0][5][0].getBoundingClientRect();
    $("#adventurer").css({ top, left });

    return this;
  }

  updateStats() {
    $("#strength").text(this.stats.strength);
    $("#vitality").text(this.stats.healingPoints + "/" + this.stats.vitality);
    this.updateHpBar();
  }

  updateHpBar() {
    const newHpBar = this.generateHpBar();
    this.element.html(newHpBar);
  }

  updateCoordinates(direction, step) {
    let coordinateName = direction === "top" ? "row" : "column";

    this[coordinateName] += step;

    $("#" + coordinateName).text(this[coordinateName]);

    checkTileActions();
  }

  move(direction, step) {
    this.movementLock = true;
    const numberOfPixels = 64;
    let stepSign = "-";
    if (step > 0) {
      stepSign = "+";
    }

    // -=64px sau +=64px
    const directionValue = stepSign + "=" + numberOfPixels + "px";

    $("#adventurer").animate({ [direction]: directionValue }, 200, () => {
      // codul se executa cand se termina animatia
      this.movementLock = false;
      this.updateCoordinates(direction, step);
      map.updateMapOpacity(hero);
      // showNextDialogIfAvailable(hero.position.row, hero.position.column);
    });
  }

  canMove(nextElement) {
    if (this.movementLock === true) {
      return false;
    }
    if (!nextElement || nextElement.hasClass("tile-disabled")) {
      return false;
    }
    return true;
  }
}

class BatSprite extends MonsterSprite {
  constructor(data) {
    super(data);
  }
}

class VilainSprite extends MonsterSprite {
  constructor(data) {
    super(data);
  }
}

class ItemSprite extends MonsterSprite {
  constructor(data) {
    super(data);
  }
}

class SpritesCollection {
  constructor() {}

  build(spritesData) {
    spritesData.forEach((sprite, spriteIndex) => {
      switch (sprite.type) {
        case "hero":
          hero = new HeroSprite(sprite);
          this.setSprite(hero);
          break;
        case "bat":
          this.setSprite(new BatSprite(sprite));
          break;
        case "vilain":
          this.setSprite(new VilainSprite(sprite));
          break;
        case "health-potion":
        case "chest-closed":
          this.setSprite(new ItemSprite(sprite));
          break;
      }
    });
  }

  setSprite(sprite) {
    if (sprite.type !== "hero")
      map.tiles[sprite.row][sprite.column].append(sprite.element);

    if (map.sprites[sprite.row] === undefined) map.sprites[sprite.row] = [];
    map.sprites[sprite.row][sprite.column] = sprite;
  }

  async load() {
    let response = await fetch("api/scenario/sprites.json");
    return response.json();
  }

  static init() {
    let sprites = new SpritesCollection();
    sprites.load().then(res => {
      sprites.build(res);
      dialogs.showNextIfAvailable(hero.row, hero.column);
    });
  }
}
