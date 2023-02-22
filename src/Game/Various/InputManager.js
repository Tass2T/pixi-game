export default class InputManager {
  constructor() {
    this.keys = {};
    window.addEventListener("keydown", this.manageInput);
    window.addEventListener("keyup", this.manageInput);
  }

  manageInput = (e) => {
    if (e.repeat) return;
    switch (e.type) {
      case "keydown":
        this.keys[e.keyCode] = true;
        break;
      case "keyup":
        this.keys[e.keyCode] = false;
        break;
      default:
        break;
    }
  };
}
