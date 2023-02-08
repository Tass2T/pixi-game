import { AnimatedSprite } from "pixi.js";
import SpriteManager from "../Various/SpriteManager";
import Character from "./Character";

export default class Villain extends Character {
    constructor (scene) {
        super(scene)
        this.spriteManager = new SpriteManager()
        this.prepareSprite()
        this.destination = {
            x: 0,
            y:0
        }
        this.spriteDirection = "down"
        this.scene.addChild(this.sprite)
    }

    prepareSprite = () => {
        const sheet = this.spriteManager.getTexture("villainTexture")
        
        this.sprite = new AnimatedSprite(sheet.animations[this.spriteDirection])
    }

    update =(x,y) =>  {

    }
}