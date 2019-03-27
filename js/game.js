let movementLock = false;

$(document).keydown(function (event) {

  if (movementLock === false) {
    switch (event.which) {
      case 37: // left
        // stanga scad din left
        console.log('left');
        $("#hero").animate({ left: "-=64px" }, 1000);
        break;

      case 38: // up
        // up scad din top
        console.log('up');
        $("#hero").animate({ top: "-=64px" }, 1000);
        break;

      case 39: // right
        // dreapta maresc din left
        $("#hero").animate({ left: "+=64px" }, 1000);
        console.log('right');
        break;

      case 40: // down
        // jos maresc topul
        movementLock = true;
        $("#hero").animate({ top: "+=64px" }, 1000, function () {
          // codul se executa cand se termina animatia
          movementLock = false;
        });
        console.log('down');
        break;

      default: console.log(event.which); // exit this handler for other keys
    }
  }
  event.preventDefault(); // prevent the default action (scroll / move caret)
});