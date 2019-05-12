class Dialogs {
  constructor() {
    this.data = [];
    this.bubbleElement = $(".speech-bubble");
    this.build();
  }

  async load() {
    let response = await fetch("api/scenario/dialogs.json");
    return response.json();
  }

  build() {
    this.load().then(dialogsResponse => {
      dialogsResponse.forEach(dialog => {
        if (!this.data[dialog.trigger.row]) {
          this.data[dialog.trigger.row] = [];
        }
        this.data[dialog.trigger.row][dialog.trigger.column] = dialog.messages;
      });
    });
  }

  showMessageBubble(element, message) {
    const { top, left } = element[0].getBoundingClientRect();
    this.bubbleElement
      .css({ top: top - 16, left: left + 64 })
      .text(message)
      .show();
  }

  showNextIfAvailable(row, column) {
    if (
      this.data[row] &&
      this.data[row][column] &&
      this.data[row][column].length > 0
    ) {
      const speaker = $("#" + this.data[row][column][0].speaker);

      this.showMessageBubble(speaker, this.data[row][column][0].message);
      this.data[row][column].shift();
      hero.movementLock = true;
    } else {
      this.bubbleElement.hide();
    }
  }
}
