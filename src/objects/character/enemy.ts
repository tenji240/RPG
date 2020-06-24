import Character from './character';

export default class Enemy extends Character {
  constructor(scene: Phaser.Scene, color: string, x: integer, y: integer) {
    super(scene, color, x, y);
  }
}
