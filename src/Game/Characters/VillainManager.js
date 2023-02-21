import Pixi from "../../Pixi";
import { MAX_NUMBER_OF_VILLAIN, VILLAIN_SPEED } from "../../utils/constants";

import Player from "./Player";
import Villain from "./Villain";

let instance = null;
export default class VillainManager {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.scene = new Pixi().scene;
    this.player = new Player();
    this.nbOfVillain = 1;
    this.villain_speed = VILLAIN_SPEED;
    this.villains = [new Villain(this.scene, this.villain_speed)];
  }

  addVilain() {
    if (this.villains.length <= MAX_NUMBER_OF_VILLAIN)
      this.villains.push(new Villain(this.scene, this.villain_speed));
  }

  update() {
    this.villains.forEach((villain) => {
      villain.update(this.player.sprite.x, this.player.sprite.y);
    });
  }
}
