import Character from "./Character";
import { player, explosion } from "../../assets/atlasAssets";
import { AnimatedSprite, Spritesheet, BaseTexture } from "pixi.js";
import {
  DEFAULT_FRAME,
  ANIMATION_SPEED,
  CHARACTER_SPEED,
  CONTROLS,
  HEIGHT,
  WIDTH,
} from "../../utils/constants.js";
import { Bullet } from "../Various/Bullets";

export default class Player extends Character {
  constructor(scene) {
    super(scene);
    this.playerSpriteSheet = new Spritesheet(
      BaseTexture.from(player.meta.image),
      player
    );
    this.preparePlayer();
    this.prepareExplosion(explosion);
    this.keys = {};
    this.bullets = [];
    this.bulletTexture;

    window.addEventListener("keydown", this.manageInput);
    window.addEventListener("keyup", this.manageInput);
  }

  async preparePlayer() {
    await this.playerSpriteSheet.parse();

    this.playerTexture = new AnimatedSprite(
      this.playerSpriteSheet.animations[this.spriteDirection]
    );
    this.playerTexture.animationSpeed = ANIMATION_SPEED;
    this.playerTexture.currentFrame = DEFAULT_FRAME;
    this.playerTexture.anchor.set(0.5);
    this.playerTexture.x = WIDTH / 2 - this.playerTexture.width;
    this.playerTexture.y = HEIGHT / 2 - this.playerTexture.height;

    this.scene.addChild(this.playerTexture);
  }

  async prepareExplosion(explosion) {
    this.explosionSheet = new Spritesheet(
      BaseTexture.from(explosion.meta.image),
      explosion
    );
    await this.explosionSheet.parse();

    this.explosionTexture = new AnimatedSprite(
      this.explosionSheet.animations.explosion
    );

    this.explosionTexture.animationSpeed = 0.3;
    this.explosionTexture.loop = false;
    this.explosionTexture.anchor.set(0.5);
  }

  updateSprite = () => {
    for (const [key, value] of Object.entries(CONTROLS)) {
      if (this.keys[value]) {
        this.playerTexture.textures =
          this.playerSpriteSheet.animations[key.toLowerCase()];
        this.playerTexture.play();
        return;
      }

      this.playerTexture.stop();
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
    const origin = { x: this.playerTexture.x, y: this.playerTexture.y };
    const destination = { x: pos.x, y: pos.y };
    this.bullets.push(
      new Bullet(origin, destination, this.scene, this.explosionTexture)
    );
  };

  update() {
    if (this.keys[CONTROLS.DOWN] && this.playerTexture.y <= HEIGHT - 52)
      this.playerTexture.y += CHARACTER_SPEED;
    if (this.keys[CONTROLS.UP] && this.playerTexture.y >= 0)
      this.playerTexture.y -= CHARACTER_SPEED;
    if (this.keys[CONTROLS.LEFT] && this.playerTexture.x >= 0)
      this.playerTexture.x -= CHARACTER_SPEED;
    if (this.keys[CONTROLS.RIGHT] && this.playerTexture.x <= WIDTH - 45)
      this.playerTexture.x += CHARACTER_SPEED;
  }

  dispose() {
    window.removeEventListener("keydown", this.manageInput);
    window.removeEventListener("keyup", this.manageInput);
  }
}
