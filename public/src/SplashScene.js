//splash 

export default class SplashScene extends Phaser.Scene {
    constructor() {
        super('SplashScene');
    }

    preload() {
        // Load your splash screen assets (e.g., logo, background)
        this.load.image('splashLogo', 'assets/images/splash-logo.png');
    }

    create() {
        // Display your splash screen elements
        const splash = this.add.image(256, 256, 'splashLogo'); // Adjust coordinates as needed
        splash.setScale(.5, .5);

        // Add a delay before transitioning to the main game scene
        this.time.delayedCall(3000, this.startMainScene, [], this);
    }

    startMainScene() {
        this.scene.start('MainScene'); // Replace 'MainScene' with your main game scene key
    }
}