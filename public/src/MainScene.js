
import Player from "./Player.js";
import MonstantoEmployee from "./MonsantoEmployee.js";
import Pumpkin from './Pumpkin.js';
import Sign from './Sign.js';
import Farmhouse from './Farmhouse.js';



import { gameHeight, gameWidth, fontFamily } from './constants.js';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.pumpkins = [];
    this.pumpkinCount = 0;

    this.positionValues = {
      x: [100, 150, 200, 250, 300, 350, 400, 450],
      y: [100, 150, 200, 250, 300, 350, 400, 450]
    }

    this.npcTextShown = false;
    this.npcText = '';
    this.npcBumpCounter = 0;

    this.employeeShown = false;

    this.signShown = false;
    this.FarmhouseShown = false;
  }

  preload() {
    Player.preload(this);
    MonstantoEmployee.preload(this);
    Pumpkin.preload(this);
    Sign.preload(this);
    Farmhouse.preload(this);
    this.load.atlas('foliage', 'assets/images/foliage.png', 'assets/images/foliage_atlas.json');
    this.load.audio('theme', 'assets/audio/Earth_Wind_And_Farmer.mp3');

    this.load.image('tiles', 'assets/plowed_soil.png');
    this.load.tilemapTiledJSON('map', 'assets/map1.json');
  }

  create() {

    // CREATE MAP
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = map.addTilesetImage('plowed_soil', 'tiles');


    const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
    const layer2 = map.createStaticLayer('FenceLayer', tileset, 0, 0);

    // CREATE PLAYER
    this.player = new Player({ scene: this, x: 50, y: 50, texture: 'princess', frame: 'princess_walk_1', id: 'playerCharacter', depth: 10 });
    this.npc = new Player({ scene: this, x: 70, y: 150, texture: 'wizard', frame: 'wizard_idle_+_walk_4', id: 'NPC' });
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
    this.song.play();
    this.isPlaying = true;

    const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    spaceBar.on('down', () => {
      this.song.setMute(this.isPlaying);
      this.isPlaying = !this.isPlaying;
    });

    for (let i = 0; i < 8; i++) {

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

    this.pumpkinText = this.add.text(165, 50, 'Collect Pumpkins!', {
      fontFamily: fontFamily,
			fontSize: '28px',
			color: '#e9e9e9'
    });
    this.pumpkinText.setDepth(5);

    this.counter = this.add.text(160, 80, '', {
      fontFamily: fontFamily,
			fontSize: '28px',
			color: '#e9e9e9',
    });
    this.counter.setDepth(5);

    this.successText = this.add.text(190, 300, '', {
      fontFamily: fontFamily,
			fontSize: '32px',
			color: 'orange',
      wordWrap: { width: 200, useAdvancedWrap: true }
    });

    // Create Credits text (empty)

    this.creditsText = this.add.text(75, 150, '', {
      fontFamily: fontFamily,
			fontSize: '12px',
      stroke: "saddlebrown",
      strokeThickness: .5,
      fill: 'orange',
      wordWrap: { width: 200, useAdvancedWrap: true },
      align: 'center'
    });

    // Create sign
    this.sign = new Sign({ scene: this });
    this.setUpSign();


    //create farmhouse
  this.Farmhouse = new Farmhouse({ scene: this });
    this.setUpFarmhouse();
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

  setUpSign() {
    this.signText = this.add.text(300, 160, "", {
        fontFamily: 'Shantell Sans',
        fontSize: '22px',
        color: '#663931',
        // stroke: "#000000",
        // strokeThickness: 6,
        // fill: 'red',
        backgroundColor: '#8F563B',
        wordWrap: { width: 200, useAdvancedWrap: true }
    });
  }

setUpFarmhouse() {
    this.FarmhouseText = this.add.text(300, 160, "", {
        fontFamily: 'Shantell Sans',
        fontSize: '22px',
        color: '#663931',
        // stroke: "#000000",
        // strokeThickness: 6,
        // fill: 'red',
        backgroundColor: '#8F563B',
        wordWrap: { width: 200, useAdvancedWrap: true }
    });
  }






  
  update() {
    this.player.update();
  }

}
