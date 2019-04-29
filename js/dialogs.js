const dialogs = [];

function generateDialogs() {
  $.ajax({
    url: "api/scenario/dialogs.json"
  }).done(function(dialogsData) {
    dialogsData.forEach(dialog => {
      let { row, column } = dialog.trigger;
      if (dialogs[row] === undefined) dialogs[row] = [];
      dialogs[row][column] = dialog.messages;
    });

    generateSprites();
  });
}

function handleDialog() {
  let { row, column } = hero.position;

  console.log("handle dialogs");

  if (dialogs[row] === undefined || dialogs[row][column] === undefined) return;

  let messages = dialogs[row][column];

  if (messages.length === 0) {
    console.log("dialog completed");
    movementLock = false;
    return;
  }

  let dialog = messages.splice(0, 1)[0];

  movementLock = true;

  let dialogElement = $("<div/>", {
    class: "speech-bubble",
    text: dialog.message
  });

  if (dialog.speaker === "hero") {
    hero.spriteElement.append(dialogElement);
  } else {
    let viewportOffset = document
      .getElementById("minotaur")
      .getBoundingClientRect();
    let top = viewportOffset.top;
    let left = viewportOffset.left;

    dialogElement.css({
      position: "absolute",
      top,
      left
    });
    $("body").append(dialogElement);
  }

  $(document).keydown(function(e) {
    e.preventDefault();
    if (e.which === 32) {
      dialogElement.remove();
      handleDialog();
    }
  });
}
