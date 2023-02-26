import { Rectangle, Sprite } from "pixi.js";
import gsap from "gsap";
import SpriteManager from "../Managers/SpriteManager";
import { BULLET_SPEED, HEIGHT, WIDTH } from "../../utils/constants";

export class Bullet {
  constructor(origin, destination, scene, player) {
    this.scene = scene;
    this.player = player;
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
    this.sprite = Sprite.from(this.spriteManager.getTexture("bulletTexture"));
    this.sprite.scale.set(0.27);
    this.sprite.anchor.set(0.5);
    this.sprite.x = origin.x;
    this.hitbox = new Rectangle();
    this.sprite.y = origin.y;
    this.rotation = this.getRadianRotation();
    this.setHitBox();
    gsap.to(this.sprite, {
      pixi: { rotation: this.getAngleRotation() },
      duration: 0,
    });

    scene.addChild(this.sprite);
  }

  getRadianRotation = () => {
    const vectorX = this.destination.x - this.origin.x;
    const vectorY = this.destination.y - this.origin.y;
    return Math.atan2(vectorY, vectorX);
  };

  getAngleRotation = () => {
    const vectorX = this.destination.x - this.origin.x;
    const vectorY = this.destination.y - this.origin.y;
    const rad = Math.atan2(vectorY, vectorX) + Math.PI / 2;
    return Math.round(rad * (180 / Math.PI));
  };

  setHitBox = () => {
    const bounds = this.sprite.getBounds();
    this.hitbox.x = bounds.x + 15;
    this.hitbox.y = bounds.y + 20;
    this.hitbox.width = bounds.width - 30;
    this.hitbox.height = bounds.height - 40;
  };

  update = () => {
    if (
      this.sprite.x < 0 ||
      this.sprite.x > WIDTH ||
      this.sprite.y < 0 ||
      this.sprite.y > HEIGHT
    ) {
      this.dispose();
    }
    this.sprite.position.x += Math.cos(this.rotation) * BULLET_SPEED;
    this.sprite.position.y += Math.sin(this.rotation) * BULLET_SPEED;
    this.setHitBox();
  };

  dispose = () => {
    this.player.bullets = this.player.bullets.filter((item) => item !== this);
    this.scene.removeChild(this.sprite);
  };
}
