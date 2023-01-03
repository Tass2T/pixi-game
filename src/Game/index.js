import { Sprite } from "pixi.js";

export default class Game {
  constructor(scene) {
    this.scene = scene;
    this.sprite = Sprite.from("src/assets/tests/tree.png");

    this.scene.addChild(this.sprite);
  }

  update() {}
}
