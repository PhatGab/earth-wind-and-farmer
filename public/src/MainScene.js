import Player from "./Player.js";
import { game } from "./game.js";



export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.enemies = [];
    //  this.physics = new Phaser.Physics.Arcade.Factory({scene: this})
    //this.physics = new Phaser.Physics.Arcade.ArcadePhysics({scene: this})
      // this.systems = {}
      // this.systems.game = game 
      // this.physics = new Phaser.Physics.Arcade.ArcadePhysics({scene: this})



    console.log(this.physics)

  }













  preload() {
    Player.preload(this);


      this.load.image('tiles', 'assets/plowed_soil.png')
      this.load.tilemapTiledJSON('map', 'assets/map1.json')


    this.load.audio('theme', 'assets/audio/Earth_Wind_And_Farmer.mp3');
  }

  create() {


  
      const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
      const tileset = map.addTilesetImage('plowed_soil', 'tiles');


      const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
      const layer2 = map.createStaticLayer('FenceLayer', tileset, 0, 0);


      

      // this.physics.collider(this.Player,layer2);
     
     //this.physics.add.collider(this.Player,FenceLayer);
     // FenceLayer.setCollisionBetween(5,15);
    



    // CREATE PLAYER
    this.player = new Player({ scene: this, x: 150, y: 150, texture: 'princess', frame: 'princess_walk_1' });    
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
    this.song.play();
    this.isPlaying = true;
    const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    spaceBar.on('down', () => {
      this.song.setMute(this.isPlaying);
      this.isPlaying = !this.isPlaying;
    })
  
  
  
  
  
    
    
  
  
  
  
    
  
  
  }





  update() {
    this.player.update();

  }

}
