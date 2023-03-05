import Pixi from "../../App";

export default class Character {
  constructor(parentContainer) {
    this.container = parentContainer;
    this.destination = {
      x: 0,
      y: 0,
    };
    this.spriteDirection = "down";
    this.directions = [];
    this.isInPause = false;
    this.isMoving = false;
    this.isDead = false;
    this.sprite;
  }

  pause = (pauseStatus) => {
    this.isInPause = pauseStatus;
    if (pauseStatus) this.sprite.stop();
    else this.sprite.play();
  };
}
