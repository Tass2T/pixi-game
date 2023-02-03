import Character from "./Character";
import { player } from "../../assets/atlasAssets";
import { AnimatedSprite, Spritesheet, BaseTexture } from "pixi.js";
import {
  DEFAULT_FRAME,
  ANIMATION_SPEED,
  CHARACTER_SPEED,
  CONTROLS
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
    this.keys = {}
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

    this.scene.addChild(this.playerTexture);
  }

  updateSprite = () => {
    for (const [key, value] of Object.entries(CONTROLS)){
      if (this.keys[value]) {
        this.playerTexture.textures =  this.playerSpriteSheet.animations[key.toLowerCase()]
        this.playerTexture.play();
        return
      }

      this.playerTexture.stop()
    }
    
  };

  manageInput = (e) => {
    if (e.repeat) return;
    switch (e.type) {
      case "keydown":
        this.keys[e.keyCode] = true;
        break;
      case "keyup":
        this.keys[e.keyCode] = false
        break;
      default:
        break;
    }
    this.updateSprite()
  };

  shoot = (e) => {
    const origin = { x: this.playerTexture.x, y: this.playerTexture.y };
    const destination = { x: e.clientX, y: e.clientY };
    this.bullets.push(new Bullet(origin, destination, this.scene));
  };

  update() {

    if (this.keys[CONTROLS.DOWN]) this.playerTexture.y += CHARACTER_SPEED;
    if (this.keys[CONTROLS.UP]) this.playerTexture.y -= CHARACTER_SPEED;
    if (this.keys[CONTROLS.LEFT]) this.playerTexture.x -= CHARACTER_SPEED;
    if (this.keys[CONTROLS.RIGHT]) this.playerTexture.x += CHARACTER_SPEED;
  }

  dispose() {
    window.removeEventListener("keydown", this.manageInput);
    window.removeEventListener("keyup", this.manageInput);
  }
}
