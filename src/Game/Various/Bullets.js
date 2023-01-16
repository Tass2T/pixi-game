import { Sprite, Texture } from "pixi.js";

export class Bullet {
  constructor(origin, destination, scene) {
    console.log(origin);
    this.origin = {
      x: origin.x,
      y: origin.y,
    };
    this.destination = {
      x: destination.x,
      y: destination.y,
    };
    this.currentPosition = {
      x: origin.x,
      y: origin.y,
    };
    this.bulletTexture = Texture.from("/src/assets/bullets/rocket.png");
    this.sprite = Sprite.from(this.bulletTexture);
    this.sprite.x = origin.x;
    this.sprite.y = origin.y;

    scene.addChild(this.sprite);
  }
}
