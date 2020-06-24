import { Hero, Enemy } from '../objects/character';
import GameLoop from '../logic/game-actions';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Fight',
};

export class FightScene extends Phaser.Scene {
  public turnTrigger: Phaser.GameObjects.DOMElement;
  public value: integer = 100;

  public hero: Hero;
  public enemy: Enemy;
  protected gameLoop: GameLoop;

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.turnTrigger = this.add.dom(200, 200).createFromCache('login');
    this.gameLoop = new GameLoop();
    this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    this.turnTrigger.setInteractive();
    this.turnTrigger.addListener('click');

    this.turnTrigger.on('click', (event: any) => {
      this.value--;
      console.log('clicked the button in the new scene', this.value);
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
