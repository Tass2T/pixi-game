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
    this.isMoving = false;
    this.isDead = false;
  }
}
