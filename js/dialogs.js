let dialogs = [];

function showMessageBubble(element, message) {
  const { top, left } = element[0].getBoundingClientRect();
  $('.speech-bubble').css({ top: top - 16, left: left + 64 }).text(message).show();
  // $('.speech-bubble').css({ top, left });
  // $('.speech-bubble').text(message);
  // $('.speech-bubble').show();
}


function loadDialogs() {
  $.ajax({
    url: "api/scenario/dialogs.json"
  }).done(function (dialogsResponse) {
    dialogsResponse.forEach(dialog => {
      if (!dialogs[dialog.trigger.row]) {
        dialogs[dialog.trigger.row] = [];
      }
      dialogs[dialog.trigger.row][dialog.trigger.column] = dialog.messages;
    });
  });
}

function showNextDialogIfAvailable(row, column) {
  if (dialogs[row] && dialogs[row][column] && dialogs[row][column].length > 0) {
    const speaker = $('#' + dialogs[row][column][0].speaker);
    showMessageBubble(speaker, dialogs[row][column][0].message);
    dialogs[row][column].shift();
    movementLock = true;
  } else {
    $('.speech-bubble').hide();
  }
}

loadDialogs();

