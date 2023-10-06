import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.enemies = [];
  }

  preload() {
    Player.preload(this);
    this.load.image('tiles', 'assets/images/RPGNatureTilesetExtruded.png');
    // this.load.tilemapTiledJSON('map', 'assets/images/natureMap.json');
    this.load.tilemapTiledJSON('map', 'assets/images/map.json');
  }

  create() {
    const map = this.make.tilemap({key: 'map'});
    // const tileset = map.addTilesetImage('RPG Nature Tileset','tiles', 32, 32, 0, 0);
    const tileset = map.addTilesetImage('RPG Nature Tileset','tiles', 32, 32, 1, 2);
    const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    const layer2 = map.createStaticLayer('Tile Layer 2', tileset, 0, 0);
    // this.player = new Player({scene: this, x: 0, y: 0, texture: 'wizard', frame: 'wizard_idle_+_walk_4'});
    this.player = new Player({scene: this, x: 50, y: 50, texture: 'princess', frame: 'princess_walk_1'});
    const wizard = new Player({scene: this, x: 100, y: 100, texture: 'wizard', frame: 'wizard_idle_+_walk_4'});
    this.add.existing(this.player);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    })
  }

  update() {
    this.player.update();
  }

}
