import { Sprite, AnimatedSprite } from "pixi.js";
import gsap from "gsap";
import SpriteManager from "./SpriteManager";
import Player from "../Characters/Player";

export class Bullet {
  constructor(origin, destination, scene) {
    this.scene = scene;
    this.player = new Player();
    this.spriteManager = new SpriteManager();
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
    this.explosionTexture = this.prepareExplosion();
    this.sprite = Sprite.from(this.spriteManager.getTexture("bulletTexture"));
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
    const rad = Math.atan2(vectorY, vectorX) + Math.PI / 2;
    return Math.round(rad * (180 / Math.PI));
  };

  explode = () => {
    this.sprite.destroy();
    this.sprite = this.explosionTexture;
    this.sprite.x = this.destination.x;
    this.sprite.y = this.destination.y;
    this.scene.addChild(this.sprite);
    this.explosionTexture.gotoAndPlay(0);
    this.explosionTexture.onComplete = () => {
      this.dispose();
    };
  };

  prepareExplosion = async () => {
    this.explosionSheet = this.spriteManager.getTexture("explosionTexture");

    this.explosionTexture = await new AnimatedSprite(
      this.explosionSheet.animations.explosion
    );

    this.explosionTexture.animationSpeed = 0.3;
    this.explosionTexture.loop = false;
    this.explosionTexture.anchor.set(0.5);
  };

  dispose() {
    this.timeline.pause()
    this.scene.removeChild(this.sprite);
    this.player.bullets = this.player.bullets.filter((item) => item !== this);
  }
}
