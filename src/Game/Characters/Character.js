import Pixi from "../../Pixi";

export default class Character {
  constructor() {
    this.scene = new Pixi().scene;
    this.destination = {
      x: 0,
      y: 0,
    };
    this.spriteDirection = "down";
    this.directions = [];
    this.isMoving = false;
    this.isDead = false
  }
}
