import { Sprite, Texture } from "pixi.js";
import gsap from "gsap";

export class Bullet {
  constructor(origin, destination, scene) {
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
    this.sprite.anchor.set(1)

    this.animation = gsap.to(this.sprite, {pixi:{rotation: 180},duration: 0})

    scene.addChild(this.sprite);
  }
}
