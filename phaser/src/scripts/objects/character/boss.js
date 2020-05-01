import Character from "./character"

const BOSS_HEALTH =  1000;
const BOSS_DAMAGE = 20;
const BOSS_ACCURACY = 70;

export default class Boss extends Character {
  constructor(scene) {
    super(scene)
    this.character =  { BOSS_HEALTH,
      maxHealth: BOSS_HEALTH,
      damage: BOSS_DAMAGE,
      accuracy: BOSS_ACCURACY,
      status: true,
    }
  }
}
