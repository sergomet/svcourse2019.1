function initDialogs() {
  $.ajax({
    url: "api/scenario/dialogs.json"
  }).done(function(dialogsData) {
    console.dir(dialogsData);
  });
}
