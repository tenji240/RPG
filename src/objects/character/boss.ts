import Character, { BASE_XP, BASE_LEVEL } from './character';

const BOSS_HEALTH = 1000;
const BOSS_DAMAGE = 20;
const BOSS_ACCURACY = 70;

export default class Boss extends Character {
  constructor(scene: Phaser.Scene) { // Phaser.Scene
    super(scene, '#000', 100, 0);
    this.character =  {
      health: BOSS_HEALTH,
      maxHealth: BOSS_HEALTH,
      damage: BOSS_DAMAGE,
      accuracy: BOSS_ACCURACY,
      status: true,
      xp: BASE_XP,
      level: BASE_LEVEL,
      avatar: null,
    };
  }
}
