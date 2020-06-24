import { Hero, Enemy } from '../objects/character';
import { TurnState } from '../lib/interfaces/game';

const BASE_ENEMEY_ACCURACY_THRESHOLD = 40;
const BASE_HERO_ACCURACY_THRESHOLD = 50;

export default class GameLoop {
  public constructor() {
    console.log('initializing game loop');
  }

  public getState(): void {
    console.log('[check state]');
  }

  public autoAttack(hero: Hero, enemy: Enemy): void {
    if (this.heroWinConditionCheck(hero, enemy)) {
      console.log('[DONE]', hero, enemy);
    } else {
      const r = this.heroAttack(hero, enemy);
      const q = this.enemeyAttack(hero, enemy);
      console.log('[STATE]', r, q);
    }
  }

  protected heroWinConditionCheck(hero: Hero, enemy: Enemy): boolean {
    return hero.character.health >= 0 && enemy.character.health <= 0;
  }

  protected enemeyAttack(hero: Hero, enemy: Enemy): TurnState {
    let enemyDamageDealt = 0;
    const enemyAccuracy = Math.floor((enemy.character.accuracy * Math.random()));
    console.log('[CHECK ENEMY ACCURACY]', enemyAccuracy);

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
    console.log('[CHECK ENEMY ACCURACY]', heroAccuracy);

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
