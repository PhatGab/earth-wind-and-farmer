// import { fontFamily } from "./constants";

// Scene for text on sign

export default class SignScene extends Phaser.Scene {
    constructor() {
        super('SignScene');
    }

    preload() {
        // this.load.image('signContent', 'assets/images/sign-content.png');
    }

    create() {
        // const sign = this.add.image(256, 256, 'signContent');

        this.signText = this.add.text(65, 50, "Don't collect too many pumpkins!", {
            // fontFamily: fontFamily,
            fontFamily: 'Helvetica',
            fontSize: '60px',
            color: 'black',
            wordWrap: { width: 450, useAdvancedWrap: true }
        });

        this.signText = this.add.text(65, 200, "Use space to return to game", {
            // fontFamily: fontFamily,
            fontFamily: 'Helvetica',
            fontSize: '28px',
            color: 'brown',
            wordWrap: { width: 450, useAdvancedWrap: true }
        });


        // sign.setScale(.5, .5);

        const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        spaceBar.on('down', () => {
            this.returnToGame();
        })
    }

    returnToGame() {
        this.scene.switch('MainScene');
    }
}