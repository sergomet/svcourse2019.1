class Map {
  constructor() {
    this.rows = null;
    this.element = $("#mapContent");
    this.arrayLength = null;
    this.tiles = [];
    this.columns = [];
    this.sprites = [];
  }

  build(mapData) {
    this.rows = mapData.map.length - 1;
    this.arrayLength = mapData.map.length;

    for (let rowIndex = 0; rowIndex < this.arrayLength; rowIndex++) {
      this.tiles.push([]);
      const rowArray = mapData.map[rowIndex];
      const rowElement = $("<div class='row'></div>");
      this.element.append(rowElement);
      this.columns = rowArray.length - 1;
      for (let columnIndex = 0; columnIndex < rowArray.length; columnIndex++) {
        const tileElement = $("<div class='tile'></div>");
        tileElement.addClass(rowArray[columnIndex]);
        rowElement.append(tileElement);
        this.tiles[rowIndex].push(tileElement);
      }
    }
  }

  getTileOpacity(hero, tileRow, tileColumn) {
    const { row, column } = hero;
    const dinstance = Math.abs(tileRow - row) + Math.abs(tileColumn - column);
    const opacity = 1 - dinstance * 0.2;
    return opacity;
  }

  updateMapOpacity(hero) {
    this.tiles.forEach((tileRow, row) => {
      tileRow.forEach((tile, column) => {
        tile.css({ opacity: this.getTileOpacity(hero, row, column) });
      });
    });
  }

  async load() {
    let response = await fetch("api/scenario/map.json");
    return response.json();
  }

  static init(callback) {
    let map = new Map();

    map.load().then(res => {
      map.build(res);
      callback();
    });

    return map;
  }
}
