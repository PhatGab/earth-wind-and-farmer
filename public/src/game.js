
import SplashScene from "./SplashScene.js";
import MainScene from "./MainScene.js";
import CreditsScene from "./CreditsScene.js";

import { gameHeight, gameWidth } from './constants.js';

// Create an object to contain the game configuration
const gameConfig = {
    width: gameWidth,
    height: gameHeight,
    backgroundColor: '#fff4b0',
    type: Phaser.AUTO,
    parent: 'earth-wind-farmer',
    scene: [SplashScene, MainScene, CreditsScene],
    scale: {
        zoom: 2
    },
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: { y: 0 }
        },
        fps: 10
    }
}

new Phaser.Game(gameConfig);
