import { Hero, Enemy } from '../objects/character';
import GameLoop from '../logic/game-actions';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Fight',
};

export class FightScene extends Phaser.Scene {
  public turnTrigger: Phaser.GameObjects.DOMElement;
  public textLog: Phaser.GameObjects.Text;
  public hero: Hero;
  public enemy: Enemy;
  protected gameLoop: GameLoop;

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.turnTrigger = this.add.dom(200, 600).createFromCache('login');
    this.gameLoop = new GameLoop(this.scene);
    this.textLog = this.add.text(0, 0, 'Hello World', { fontFamily: 'sans-serif' });
    this.turnTrigger.setInteractive();
    this.turnTrigger.addListener('click');

    // ** load assets into the scene and check the game loop
    this.loadBattleScene();

    this.turnTrigger.on('click', (event: any) => {
      this.executeAutoTurn();
    });

    // ** trigger a draw event
    this.hero.draw('0xFFFFFF', 200, 200);
    this.enemy.draw('0x6666FF', 300, 300);
  }

  public update(): void {
    // console.log('new frame');
  }

  protected loadBattleScene(): void {
    this.hero = new Hero(this);
    this.enemy = new Enemy(this, 'red', 100, 100);
  }

  protected executeAutoTurn(): void {
    const turnState = this.gameLoop.autoAttack(this.hero, this.enemy);
    if (turnState) {
      this.textLog.setText(`HERO DAMAGE: ${turnState.heroState.heroDamageDealt}\n
                          HERO: ${this.hero.character.health}/${this.hero.character.maxHealth}\n
                          ENEMY DAMAGE: ${turnState.enemyState.heroDamageDealt}\n
                          ENEMY: ${this.enemy.character.health}/${this.enemy.character.maxHealth}\n`);
    } else {
      this.textLog.setText('Game Complete');
    }
    // console.log('[STATE]', this.hero.character, this.enemy.character);
  }

}
