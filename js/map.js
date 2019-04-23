const map = {
  rows: 0,
  columns: 0,
  tiles: [],
  sprites: []
};

function generateMap(mapData) {
  map.rows = mapData.map.length - 1;

  const mapElement = $('#mapContent');
  const mapArrayLength = mapData.map.length;

  for (let rowIndex = 0; rowIndex < mapArrayLength; rowIndex++) {
    map.tiles.push([]); //map.tiles[rowIndex] = [];
    const rowArray = mapData.map[rowIndex];
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
}

function initMap(callback) {
  $.ajax({
    url: "api/scenario/map.json"
  }).done(function (mapData) {

    generateMap(mapData)
    callback();
  });
}