const hero = {
  visible: true,
  position: {
    row: 0,
    column: 0
  }
}

const map = {
  rows: 0,
  columns: 0
};


let movementLock = false;


$.ajax({
  url: "api/scenario/map.json"
})
  .done(function (data) {
    // console.log(data);
    // data.map.forEach(function (value, index) {
    //   console.log(value, index);
    // });

    map.rows = data.map.length - 1;
    // map.columns = data.size.columns;

    const mapElement = $('#mapContent');
    const mapArrayLength = data.map.length;
    for (let rowIndex = 0; rowIndex < mapArrayLength; rowIndex++) {
      const rowArray = data.map[rowIndex];
      const rowElement = $("<div class='row'></div>");
      mapElement.append(rowElement);
      map.columns = rowArray.length - 1;
      for (let columnIndex = 0; columnIndex < rowArray.length; columnIndex++) {
        const tileElement = $("<div class='tile'></div>");
        tileElement.addClass(rowArray[columnIndex]);
        rowElement.append(tileElement);
      }
    }
  });

$(document).keydown(function (event) {

  if (movementLock === false) {
    switch (event.which) {
      case 37: // left
        if (hero.position.column > 0) { //
          movementLock = true;
          // stanga scad din left
          console.log('left');
          $("#hero").animate({ left: "-=64px" }, 200, function () {
            movementLock = false;
            hero.position.column--;
            $("#column").text(hero.position.column);
          });
        }
        break;

      case 38: // up
        if (hero.position.row > 0) {
          movementLock = true;
          // up scad din top
          console.log('up');
          $("#hero").animate({ top: "-=64px" }, 200, function () {
            movementLock = false;
            hero.position.row--;
            $("#row").text(hero.position.row);
          });
        }
        break;

      case 39: // right
        if (hero.position.column < map.columns) {
          movementLock = true;
          // dreapta maresc din left
          $("#hero").animate({ left: "+=64px" }, 200, function () {
            movementLock = false;
            hero.position.column++;
            $("#column").text(hero.position.column);
          });
          console.log('right');
        }
        break;

      case 40: // down
        // jos maresc topul
        if (hero.position.row < map.rows) {
          movementLock = true;
          $("#hero").animate({ top: "+=64px" }, 200, function () {
            // codul se executa cand se termina animatia
            movementLock = false;
            hero.position.row++;
            $("#row").text(hero.position.row);
          });
          console.log('down');
        }
        break;

      default: console.log(event.which); // exit this handler for other keys
    }
  }
  event.preventDefault(); // prevent the default action (scroll / move caret)
});

