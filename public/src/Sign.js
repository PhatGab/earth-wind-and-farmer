import Prop from "./Prop.js";

export default class Sign extends Prop {

    constructor({ scene }) {

        super({
            scene,
            x: 420, // lol
            y: 260,
            texture: 'sign'
        });

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const signCollider = Bodies.circle(this.x, this.y, 16, { isSensor: false, label: 'signCollider' });
        const signSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: 'signSensor' });

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

    readSign(scene) {
        scene.signText.setText(`"Don't collect too many pumpkins!"`);
        scene.signText.setDepth(5);
        scene.signText.setPadding(10);
        scene.signShown = true;
    }

    hideSign(scene) {
        scene.signText.setText('');
        scene.signText.setPadding(0);
        scene.signShown = false;
    }

}
