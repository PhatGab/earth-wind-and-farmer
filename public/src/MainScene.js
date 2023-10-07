import Player from "./Player.js";
import Pumpkin from './Pumpkin.js';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.enemies = [];
  }

  preload() {
    Player.preload(this);
    Pumpkin.preload(this);
    this.load.image('tiles', 'assets/images/RPGNatureTilesetExtruded.png');
    this.load.tilemapTiledJSON('map', 'assets/images/map.json');
    this.load.atlas('foliage', 'assets/images/foliage.png', 'assets/images/foliage_atlas.json');
    this.load.audio('theme', 'assets/audio/Earth_Wind_And_Farmer.mp3');
  }

  create() {

    // CREATE MAP
    const map = this.make.tilemap({ key: 'map' });
    this.map = map;
    // const tileset = map.addTilesetImage('RPG Nature Tileset','tiles', 32, 32, 0, 0);
    const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 1, 2);
    const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    const layer2 = map.createStaticLayer('Tile Layer 2', tileset, 0, 0);

    // CREATE PLAYER
    this.player = new Player({ scene: this, x: 50, y: 50, texture: 'princess', frame: 'princess_walk_1' });
    const wizard = new Player({ scene: this, x: 100, y: 100, texture: 'wizard', frame: 'wizard_idle_+_walk_4' });
    this.add.existing(this.player);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });



    // CREATE AUDIO
    this.song = this.sound.add('theme', { volume: 0.5 });
    // TOGGLE THIS LINE BELOW TO STOP MUSIC ON LOAD
    // this.song.play();
    this.isPlaying = true;
    const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    spaceBar.on('down', () => {
      this.song.setMute(this.isPlaying);
      this.isPlaying = !this.isPlaying;
    })

    // JILL TO DO: 
    // Add conditionals for :
    // Pumpkins off the map
    // Pumpkins in existing places. (Maybe a value change in Pumpkin.js, check to see if something is there?)
    // Hacky way: store values in array and check against?

    this.pumpkins = [];

    for (let i = 0; i < 10; i++) {
      const xValue = Math.floor(Math.random() * 500) + 20;
      const yValue = Math.floor(Math.random() * 500) + 20;
      const pumpkinID = 'pumpkinCollider' + i;
      const newPumpkin = new Pumpkin({
        scene: this,
        pumpkinConfig: {
          name: 'pumpkin',
          id: pumpkinID,
          x: xValue,
          y: yValue,
          type: 'pumpkin'
        }
      });
      this.pumpkins.push(newPumpkin);
      this.add.existing(newPumpkin);
    }

    // LOAD PUMPKIN COUNTER
    this.counter = this.add.text(160, 40, 'NO PUMPKINS YET!', {
      fontFamily: 'Arial',
			fontSize: '28px',
			color: '#e9e9e9',
    });

    this.successText = this.add.text(190, 300, '', {
      fontFamily: 'Arial',
			fontSize: '32px',
			color: 'orange',
    });
  }

  addFoliage() {
    const foliage = this.map.getObjectLayer('Foliage');
    foliage.objects.forEach(resource => {
      const foliageItem = new Phaser.Physics.Matter.Sprite(this.matter.world, resource.x, resource.y, 'foliage', 'tree');
      foliageItem.setStatic(true);
      this.add.existing(foliageItem);
    })
  }

  update() {
    this.player.update();
  }

}
