import Prop from "./Prop.js";

// JILL TO DO -- easily abstract this to render any img asset (pass params)

export default class Sign extends Prop {

    constructor({ scene }) {

        super({
            scene,
            x: 420, // lol
            y: 160,
            texture: 'sign'
        });

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const signCollider = Bodies.circle(this.x, this.y, 6, { isSensor: false, label: 'signCollider'});
        const signSensor = Bodies.circle(this.x, this.y, 14, { isSensor: true, label: 'signSensor' });

        const compoundBody = Body.create({
            parts: [signCollider, signSensor],
            frictionAir: 0.35
        });
        this.setScale(1, 1);
        this.setExistingBody(compoundBody);
        this.setStatic(true);
    }

    static preload(scene) {
        scene.load.image('sign', 'assets/images/sign.png');
    }

    static readSign(scene) {
        scene.scene.start('SignScene');
    }

    create() {

    }

}