import { Sprite, AnimatedSprite } from "pixi.js";
import gsap from "gsap";
import SpriteManager from "./SpriteManager";

export class Bullet {
  constructor(origin, destination, scene, explosionTexture) {
    this.scene = scene;
    this.spriteManager = new SpriteManager()
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
    this.sprite.x = origin.x + 20;
    this.sprite.y = origin.y + 20;
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
    this.explosionTexture.gotoAndPlay(0);
    this.scene.addChild(this.sprite);
    this.explosionTexture.onComplete = () => {
      this.scene.removeChild(this.sprite);
      delete this;
    };
  };

  prepareExplosion =async ()=> {
    this.explosionSheet = this.spriteManager.getTexture("explosionTexture")
    
    this.explosionTexture =await  new AnimatedSprite(
      this.explosionSheet.animations.explosion
    );

    this.explosionTexture.animationSpeed = 0.3;
    this.explosionTexture.loop = false;
    this.explosionTexture.anchor.set(0.5);

  }
}
