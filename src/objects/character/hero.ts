import Character from './character';

export default class Hero extends Character {
  // TODO: fix to match character
  constructor(scene: Phaser.Scene) {
    super(scene, '#FFF', 200, 200);
  }
}
