export default class Character {
  constructor(scene) {
    this.scene = scene;
    this.position = {
      x: 0,
      y: 0,
    };
    this.destination = {
      x: 0,
      y: 0,
    };
    this.spriteDirection = "down";
    this.directions = [];
    this.isMoving = false;
  }
}
