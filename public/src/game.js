
import SplashScene from "./SplashScene.js";
import MainScene from "./MainScene.js";
import SignScene from './SignScene.js';

import { gameHeight, gameWidth } from './constants.js';


// Create an object to contain the game configuration
const gameConfig = {
    width: gameWidth,
    height: gameHeight,
    backgroundColor: '#fff4b0',
    type: Phaser.AUTO,
    parent: 'earth-wind-farmer',
    // scene: [SplashScene, MainScene],
    scene: [MainScene, SignScene],
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

new Phaser.Game(gameConfig);
