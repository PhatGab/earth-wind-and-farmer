// credits

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    preload() {
        this.load.image('credits', 'assets/images/credits.png')
    }

    create({audio, audioStarted, songPlaying, audioText}) {

        this.audio = audio;
        this.audioStarted = audioStarted;
        this.songPlaying = songPlaying;
        this.audioText = audioText;

        if (!this.audioStarted) {
            this.audioText = this.add.text(325, 5, 'Use the spacebar to start audio!', {
              fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
                fontSize: '10px',
                color: '#e9e9e9',
            });
            this.audioText.setDepth(5);
        } else {
            this.audioText = this.add.text(300, 5, 'Use the spacebar to toggle this sick beat!', {
              fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
                fontSize: '10px',
                color: '#e9e9e9',
            });
            this.audioText.setDepth(5);
        }

        const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        spaceBar.on('down', () => { 
          if (!this.audioStarted) {
            this.audio.play();
            this.audioStarted = true;
            this.songPlaying = true;
            this.audioText.setX(300);
          } else {
            this.audio.setMute(this.songPlaying);
            this.songPlaying = !this.songPlaying;
          }
        });

        const credits = this.add.image(256, 256, 'credits')
        
        credits.setScale(.5, .5);

        console.log('Github (Assets used are listed in readMe):')
        console.log('https://github.com/PhatGab/earth-wind-and-farmer');
        console.log('Created for Virtual Turtle Games Cozy Fall Jame 2023');
        console.log('https://itch.io/jam/cozy-fall-jam-2023');
    }

}