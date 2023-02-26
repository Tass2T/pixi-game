import { MENU } from "../../utils/constants";
import EventEmitter from "./EventEmitter";

let instance = null;

export default class InputManager extends EventEmitter {
  constructor() {
    if (instance) return instance;
    super();
    instance = this;
    this.keys = {};
    window.addEventListener("keydown", this.manageInput);
    window.addEventListener("keyup", this.manageInput);
  }

  manageInput = (e) => {
    if (e.repeat) return;
    switch (e.type) {
      case "keydown":
        switch (e.keyCode) {
          case MENU.PAUSE:
            this.keys[e.keyCode] = !this.keys[e.keyCode];
            break;
          default:
            this.keys[e.keyCode] = true;
            this.trigger("playerInput");
            break;
        }
        break;
      case "keyup":
        if (e.keyCode !== MENU.PAUSE) {
          this.keys[e.keyCode] = false;
          this.trigger("playerInput");
        }
        break;
      default:
        break;
    }
  };
}
