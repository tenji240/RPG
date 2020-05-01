// exported constants
export const BASE_HEALTH =  100;
export const BASE_DAMAGE = 10;
export const BASE_HEAL = 15;
export const BASE_ACCURACY = 80;
export const BASE_XP = 0;
export const BASE_LEVEL = 1;

// internal constants
const ACCURACY_CHECK_MIN = 30;

export default class Character extends Phaser.GameObjects.GameObject {

  // base character setup, will 
  character = {
    health: BASE_HEALTH,
    maxHealth: BASE_HEALTH,
    damage: BASE_DAMAGE,
    accuracy: BASE_ACCURACY,
    status: true,
    xp: BASE_XP,
    level: BASE_LEVEL
  };

  constructor(scene) {
    super(scene, 'sprite')
  }

  attack() {
    let dmg = 0;
    const turn_accuracy = Math.floor((this.character.accuracy * Math.random()));
    console.log('[Accuracy check]', turn_accuracy);

    if (turn_accuracy > ACCURACY_CHECK_MIN) {
      dmg = Math.floor((this.character.damage * Math.random()));
    }
    return dmg;
  }

  updateHealth = (dmg) => this.character.health -= dmg
}
