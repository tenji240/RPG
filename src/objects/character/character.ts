import { PlayerCharacter } from 'src/lib/interfaces/character';

// exported constants
export const BASE_HEALTH =  100;
export const BASE_DAMAGE = 20;
export const BASE_HEAL = 15;
export const BASE_ACCURACY = 80;
export const BASE_XP = 0;
export const BASE_LEVEL = 1;

// internal constants
const ACCURACY_CHECK_MIN = 30;

// TODO: replace with sprite object
export default class Character extends Phaser.GameObjects.GameObject {

  // base character setup, will
  public character: PlayerCharacter = {
    health: BASE_HEALTH,
    maxHealth: BASE_HEALTH,
    damage: BASE_DAMAGE,
    accuracy: BASE_ACCURACY,
    status: true,
    xp: BASE_XP,
    level: BASE_LEVEL,
    avatar: null,
  };

  public constructor(scene: Phaser.Scene, color: string, x: integer, y: integer) {
    super(scene, 'sprite');
    this.character.avatar = new Phaser.GameObjects.Graphics(scene);
  }

  // insert a base character image
  public draw(color: string, x: integer, y: integer) { // hexadeciamal valie inside
    this.character.avatar.clear();
    this.character.avatar.lineStyle(5, 0xFF00FF, 1.0);
    this.character.avatar.fillStyle(color, 1.0);
    this.character.avatar.fillRect(x, y, 400, 200);
    this.character.avatar.strokeRect(x, y, 400, 200);
    this.scene.add.existing(this.character.avatar);
    console.log('[CHECK DRAW]', this.character.avatar);
  }

  public attack() {
    let dmg = 0;
    const turnAccuracy = Math.floor((this.character.accuracy * Math.random()));
    console.log('[Accuracy check]', turnAccuracy);

    if (turnAccuracy > ACCURACY_CHECK_MIN) {
      dmg = Math.floor((this.character.damage * Math.random()));
    }
    return dmg;
  }

  public updateHealth = (dmg: integer) => this.character.health -= dmg;
}
