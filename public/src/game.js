import MainScene from "./MainScene.js"
import SplashScene from "./SplashScene.js";

 

// Create an object to contain the game configuration
const gameConfig = {
    width: 512,
    height: 512,
    backgroundColor: '#fff4b0',
    type: Phaser.AUTO,
    parent: 'earth-wind-farmer',
    scene: [SplashScene, MainScene],
    // scale gives the pixelated vieaw
    scale: {
        zoom: 2
    },
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            // turn gravity off -- not a platforming 2d game
            gravity: { y: 0 }
        },
        fps: 10
    }
}

//const game = new Phaser.Game(gameConfig);
new Phaser.Game(gameConfig);
