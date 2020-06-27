import { Hero, Enemy } from '../objects/character';
import GameLoop from '../logic/game-actions';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Fight',
};

export class FightScene extends Phaser.Scene {
  public turnTrigger: Phaser.GameObjects.DOMElement;

  public hero: Hero;
  public enemy: Enemy;
  protected gameLoop: GameLoop;

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.turnTrigger = this.add.dom(200, 600).createFromCache('login');
    this.gameLoop = new GameLoop(this.scene);
    this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    this.turnTrigger.setInteractive();
    this.turnTrigger.addListener('click');

    // ** load assets into the scene and check the game loop
    this.loadBattleScene();
    console.log('[GAME LOOP CHECK]', this.hero, this.enemy);

    this.turnTrigger.on('click', (event: any) => {
      const autoTurnState = this.gameLoop.autoAttack(this.hero, this.enemy);
      console.log('[TURN STATE]', autoTurnState);
      console.log('[HERO]', this.hero.character.health);
      console.log('[ENEMY]', this.enemy.character.health);
    });

    // ** trigger a draw event
    // this.hero.draw('0xFFFFFF', 400, 400);
  }

  public update(): void {
    // console.log('new frame');
  }

  protected loadBattleScene(): void {
    this.hero = new Hero(this);
    this.enemy = new Enemy(this, 'red', 100, 100);
  }

  protected executeAutoTurn(): void {
    this.gameLoop.autoAttack(this.hero, this.enemy);
  }

}
