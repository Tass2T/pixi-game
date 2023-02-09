import { VILLAIN_SPAWN_DIRECTION } from "../../utils/constants";
import Villain from "./Villain";

export default class VillainManager {
  constructor(scene) {
    this.scene = scene;
    this.nbOfVillain = 1;
    this.villains = [
      new Villain(
        this.scene,
        VILLAIN_SPAWN_DIRECTION[Math.floor(Math.random() * 4)]
      ),
    ];
  }

  update = (x, y) => {};
}
