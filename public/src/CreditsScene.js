// credits

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    preload() {
        this.load.image('credits', 'assets/images/credits.png')
    }

    create() {
        const credits = this.add.image(256, 256, 'credits')
        
        credits.setScale(.5, .5);

        console.log('Github:')
        console.log('https://github.com/PhatGab/earth-wind-and-farmer');
        console.log('Created for Virtual Turtle Games Cozy Fall Jame 2023');
        console.log('https://itch.io/jam/cozy-fall-jam-2023');
    }

}