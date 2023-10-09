// import { fontFamily } from "./constants";


export default class MonstantoEmployee extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        const { scene, x, y, texture, frame, id, playerCoordinates, player } = data;
        super(scene.matter.world, x, y, texture, frame, id, playerCoordinates, player);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const employeeCollider = Bodies.circle(this.x, this.y, 8, { isSensor: false, label: id + 'employeeCollider' });
        const employeeSensor = Bodies.circle(this.x, this.y, 16, { isSensor: true, label: id + 'employeeSensor' });
        const compoundBody = Body.create({
            parts: [employeeCollider, employeeSensor],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();

        this.playerCoordinates = playerCoordinates;

        this.player = player;

        this.scene.matter.world.on('collisionstart', this.collisionHandler);

    }

    static preload(scene) {
        scene.load.atlas('employee', 'assets/images/employee.png', 'assets/images/employee_atlas.json');
        scene.load.animation('employee', 'assets/images/employee_anim.json');
    }

    enterScene() {
        this.scene.add.existing(this);

        this.anims.play('female_walk');

        this.enterAnimation = setInterval(this.updatePosition.bind(this), 100);

    }

    updatePosition() {
        let xCorrect = false;
        let yCorrect = false;

        // If the employee has already bumped the player, do not update
        // But with this, the employee will chase the player on initial load
        // Would love to have the employee chase at a different speed, but we'll see

        if (this.player.employeeConfrontation) {
            xCorrect = true;
            yCorrect = true;
        } else {
            if (this.playerCoordinates.x + 10 > this.x) {
                this.setVelocityX(5);
            } else {
                this.setVelocityX(-5);
                xCorrect = true;
            }
    
            if (this.playerCoordinates.y  + 10 > this.y) {
                this.setVelocityY(5);
            } else {
                this.setVelocityY(-5);
                yCorrect = true;
            }
        }

        if (xCorrect && yCorrect) {
            clearInterval(this.enterAnimation);
            this.anims.play('female_idle');
            this.playMonsantoMessage();
        }
    }

    playMonsantoMessage() {
        this.scene.successText = this.scene.add.text(this.x - 30, this.y - 45, "HEY!", {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: 'black',
            depth: 10,
            stroke: "black",
            strokeThickness: .2,
            wordWrap: { width: 75, useAdvancedWrap: true },
            align: 'center'
        });

        setTimeout(() => {
            this.scene?.successText?.setFontSize('12px');
            this.scene?.successText?.setY(this.y - 60);
            this.scene?.successText?.setX(this.x - 35);
            this.scene?.successText?.setText("That's too many pumpkins!");
        }, 1500);

        this.scene.creditsText.setText(`Monsanto thinks you've collected too many pumpkins! Press Enter to see credits, Press 'P' to hide this text`);
        const enter = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        const p = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        enter.on('down', () => {
            this.scene.scene.start('CreditsScene', {audio: this.scene.song, audioStarted: this.scene.audioStarted, songPlaying: this.scene.songPlaying, audioText: this.scene.audioText});
        });

        p.on('down', () => {
            this.scene.creditsText.setText('');
          });
  
    }

    collisionHandler(e) {
        if (e.pairs.length > 1 && ((e.pairs[1].bodyA.label.startsWith('playerCharacter') && e.pairs[1].bodyB.label === 'employeeCollider') || (e.pairs[1].bodyB.label.startsWith('playerCharacter') && e.pairs[1].bodyA.label === 'employeeCollider'))) {
            clearInterval(this.enterAnimation);
        }
    }



}
