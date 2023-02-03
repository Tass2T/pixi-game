import { Sprite, Texture } from "pixi.js";
import gsap from "gsap";

export class Bullet {
  constructor(origin, destination, scene) {
    this.scene = scene
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
    this.sprite.anchor.set(0.5);
    const rotation = this.getRotation();

    this.timeline = gsap.timeline({ onComplete: this.explode });
    this.timeline.to(this.sprite, {
      pixi: { rotation },
      duration: 0,
    });
    this.timeline.to(this.sprite, {
      pixi: {
        x: destination.x,
        y: destination.y,
      },
      duration: 0.3,
    });

    scene.addChild(this.sprite);
  }

  getRotation = () => {
    const vectorX = this.destination.x - this.origin.x;
    const vectorY = this.destination.y - this.origin.y;
    const rad = Math.atan2(vectorY, vectorX);
    return Math.round(rad * (180 / Math.PI));
  };

  explode = () => {
    this.scene. removeChild(this.sprite)
    this.sprite.destroy
    delete this
    
  };
}
