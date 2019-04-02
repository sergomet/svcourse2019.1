
// A $( document ).ready() block.
$(document).ready(function () {
  let showHideButton = $("#showHide");
  let headerElement = $("#header");
  let changeStyle = $("#changeStyle");
  showHideButton.click(function () {
    if (hero.visible) {
      showHideButton.text("Show Hero");
      $("#hero").hide();
      hero.visible = false;
    } else {
      showHideButton.text("Hide Hero");
      $("#hero").show();
      hero.visible = true;
    }
    // hero.visible = !hero.visible;
  });

  changeStyle.click(function () {
    $("#header").css({ "color": "red", "font-size": "16px", "font-weight": "bold" });
  })

});