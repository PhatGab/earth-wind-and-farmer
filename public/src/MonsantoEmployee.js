// import { fontFamily } from "./constants";


export default class MonstantoEmployee extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        const { scene, x, y, texture, frame, id, playerCoordinates } = data;
        super(scene.matter.world, x, y, texture, frame, id, playerCoordinates);

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

        if (this.playerCoordinates.x + 5 > this.x) {
            this.setVelocityX(5);
        } else {
            xCorrect = true;
        }

        if (this.playerCoordinates.y  + 5 > this.y) {
            this.setVelocityY(5);
        } else {
            yCorrect = true;
        }

        if (xCorrect && yCorrect) {
            clearInterval(this.enterAnimation);
            this.anims.play('female_idle');
            this.playMonsantoMessage();
        }
    }

    playMonsantoMessage() {
        this.scene.successText = this.scene.add.text(this.x - 30, this.y - 45, "HEY!", {
            // fontFamily: fontFamily,
            fontFamily: 'Courier',
            fontSize: '20px',
            color: 'black',
            wordWrap: { width: 200, useAdvancedWrap: true }
        });

        setTimeout(() => {
            this.scene.successText.setFontSize('12px');
            this.scene.successText.setY(this.y - 30);
            this.scene.successText.setX(this.x - 45);
            this.scene.successText.setText("That's too many pumpkins!");
        }, 1500);
    }

    collisionHandler(e) {
        if (e.pairs.length > 1 && ((e.pairs[1].bodyA.label.startsWith('playerCharacter') && e.pairs[1].bodyB.label === 'employeeCollider') || (e.pairs[1].bodyB.label.startsWith('playerCharacter') && e.pairs[1].bodyA.label === 'employeeCollider'))) {
            clearInterval(this.enterAnimation);
        }
    }



}
