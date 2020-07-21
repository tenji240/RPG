import { Hero, Enemy } from '../objects/character';
import { TurnState, AutoTurnState } from '../lib/interfaces/game';

const BASE_ENEMEY_ACCURACY_THRESHOLD = 40;
const BASE_HERO_ACCURACY_THRESHOLD = 50;

export default class GameLoop extends Phaser.Scene {
  public constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
    console.log('initializing game loop');
  }

  public getState(): void {
  }

  public autoAttack(hero: Hero, enemy: Enemy): AutoTurnState {
    if (this.heroWinConditionCheck(hero, enemy)) {
      console.log('[DONE]', hero, enemy);
      return null;
    } else {
      const heroState = this.heroAttack(hero, enemy);
      const enemyState = this.enemeyAttack(hero, enemy);
      return {
        heroState,
        enemyState,
      };
    }
  }

  protected heroWinConditionCheck(hero: Hero, enemy: Enemy): boolean {
    if (hero.character.health > 0 && enemy.character.health > 0) {
      return false;
    }
    if (hero.character.health > 0 && enemy.character.health <= 0) {
      return true;
    }
    if (enemy.character.health > 0 && hero.character.health <= 0) {
      return true;
    }
    return false;
  }

  protected enemeyAttack(hero: Hero, enemy: Enemy): TurnState {
    let enemyDamageDealt = 0;
    const enemyAccuracy = Math.floor((enemy.character.accuracy * Math.random()));

    if (enemyAccuracy > BASE_ENEMEY_ACCURACY_THRESHOLD) {
      enemyDamageDealt = Math.floor((enemy.character.damage * Math.random()));
      hero.character.health -= enemyDamageDealt;
    }

    return {
      enemyAccuracy,
      enemyDamageDealt,
      heroAccuracy: 0,
      heroDamageDealt: 0,
    };
  }

  protected heroAttack(hero: Hero, enemy: Enemy): TurnState {
    let heroDamageDealt = 0;
    const heroAccuracy = Math.floor((hero.character.accuracy * Math.random()));

    if (heroAccuracy > BASE_HERO_ACCURACY_THRESHOLD) {
      heroDamageDealt = Math.floor((enemy.character.damage * Math.random()));
      enemy.character.health -= heroDamageDealt;
    }

    return {
      heroDamageDealt,
      heroAccuracy,
      enemyDamageDealt: 0,
      enemyAccuracy: 0,
    };
  }

}
