import Character from "./Character";
import { AnimatedSprite } from "pixi.js";
import {
  DEFAULT_FRAME,
  ANIMATION_SPEED,
  CHARACTER_SPEED,
  CONTROLS,
  HEIGHT,
  WIDTH,
} from "../../utils/constants.js";
import { Bullet } from "../Various/Bullets";
import SpriteManager from "../Various/SpriteManager.js";

let instance = null;

export default class Player extends Character {
  constructor() {
    if (instance) return instance;
    super();
    instance = this;
    this.spriteManager = new SpriteManager();
    this.preparePlayer();
    this.keys = {};
    this.bullets = [];

    window.addEventListener("keydown", this.manageInput);
    window.addEventListener("keyup", this.manageInput);
  }

  async preparePlayer() {
    this.playerSpriteSheet = this.spriteManager.getTexture("playerTexture");
    this.sprite = new AnimatedSprite(
      this.playerSpriteSheet.animations[this.spriteDirection]
    );

    this.sprite.animationSpeed = ANIMATION_SPEED;
    this.sprite.currentFrame = DEFAULT_FRAME;
    this.sprite.anchor.set(0.5);
    this.sprite.x = WIDTH / 2 - this.sprite.width;
    this.sprite.y = HEIGHT / 2 - this.sprite.height;

    this.scene.addChild(this.sprite);
  }

  updateSprite = () => {
    for (const [key, value] of Object.entries(CONTROLS)) {
      if (this.keys[value]) {
        this.sprite.textures =
          this.playerSpriteSheet.animations[key.toLowerCase()];
        this.sprite.play();
        return;
      }

      this.sprite.stop();
    }
  };

  manageInput = (e) => {
    if (e.repeat) return;
    switch (e.type) {
      case "keydown":
        this.keys[e.keyCode] = true;
        break;
      case "keyup":
        this.keys[e.keyCode] = false;
        break;
      default:
        break;
    }
    this.updateSprite();
  };

  shoot = (e) => {
    const pos = e.data.global;
    const origin = { x: this.sprite.x, y: this.sprite.y };
    const destination = { x: pos.x, y: pos.y };
    this.bullets.push(
      new Bullet(origin, destination, this.scene, this.explosionTexture)
    );
  };

  update() {
    if (this.keys[CONTROLS.DOWN] && this.sprite.y <= HEIGHT - 52)
      this.sprite.y += CHARACTER_SPEED;
    if (this.keys[CONTROLS.UP] && this.sprite.y >= 0)
      this.sprite.y -= CHARACTER_SPEED;
    if (this.keys[CONTROLS.LEFT] && this.sprite.x >= 0)
      this.sprite.x -= CHARACTER_SPEED;
    if (this.keys[CONTROLS.RIGHT] && this.sprite.x <= WIDTH - 45)
      this.sprite.x += CHARACTER_SPEED;

    this.bullets.forEach((bullet) => {
      bullet.update();
    });
  }

  dispose() {
    window.removeEventListener("keydown", this.manageInput);
    window.removeEventListener("keyup", this.manageInput);
  }
}
