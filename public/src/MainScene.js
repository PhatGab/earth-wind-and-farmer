
import Player from "./Player.js";
import Pumpkin from './Pumpkin.js';

import { gameHeight, gameWidth } from './constants.js';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.pumpkins = [];
    this.pumpkinCount = 0;

    this.positionValues = {
      x: [50, 100, 150, 200, 250, 300, 350, 400, 450],
      y: [50, 100, 150, 200, 250, 300, 350, 400, 450]
    }
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

    for (let i = 0; i < 9; i++) {

      const xValue = this.getPositionValue('x');
      const yValue = this.getPositionValue('y');

      const pumpkinID = 'pumpkinCollider' + i;
      const newPumpkin = new Pumpkin({
        scene: this,
        pumpkinConfig: {
          name: 'pumpkin',
          id: pumpkinID,
          x: xValue,
          y: yValue,
          type: 'pumpkin',
          texture: 'pumpkin'
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

  getPositionValue(positionType) {

    let selectedVal = 0;

    // If there is only one value left, return that
    if (this.positionValues[positionType].length === 1) {
      return selectedVal = this.positionValues[positionType][0];
    }

    // Get random value from available array
    selectedVal = this.positionValues[positionType][Math.floor(Math.random() * this.positionValues[positionType].length)];

    // Remove selected value from the array so ti won't be duplicated
    this.positionValues[positionType] = this.positionValues[positionType].filter(value => value !== selectedVal);

    // Add small random value to value so the pumpkin won't always fall on a certain vertices, but still not overlap
    selectedVal = selectedVal + Math.floor(Math.random() * 3);

    return selectedVal;
  }

  update() {
    this.player.update();
  }

}
