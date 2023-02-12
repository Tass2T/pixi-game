import Pixi from "../../Pixi";

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
    this.villains = [
      new Villain(
        this.scene
      ),
    ];
  }

  addVilain(villainToRevive = null) {
    console.log(villainToRevive);
    if (villainToRevive) villainToRevive.prepareSprite()
    if (this.villains.length <= 20) this.villains.push(new Villain(this.scene))
  }

  update () {
    // this.villains.forEach((villain) => {
    //   villain.update();
    // });
  };
}
