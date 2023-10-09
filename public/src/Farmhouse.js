import Prop from "./Prop.js";

export default class Farmhouse extends Prop {

    constructor({ scene }) {

        super({
            scene,
            x: 60,
            y: 450,
            texture: 'Farmhouse'
        });

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const farmhouseCollider = Bodies.circle(this.x, this.y, 22, { isSensor: false, label: 'farmhouseCollider' });
        const farmhouseSensor = Bodies.circle(this.x, this.y, 30, { isSensor: true, label: 'farmhouseSensor' });

        const compoundBody = Body.create({
            parts: [farmhouseCollider, farmhouseSensor],
            frictionAir: 0.35
        });
        
        this.setScale(.1,.1);
        this.setExistingBody(compoundBody);
        this.setStatic(true);
    }

    static preload(scene) {
        scene.load.image('Farmhouse', 'assets/images/Farmhouse.png');
    }

    readFarmhouse(scene) {
        scene.farmhouseText.setText("No pumpkins in here!");
        scene.farmhouseText.setDepth(5);
        scene.farmhouseText.setPadding(2.5);
        scene.farmhouseShown = true;
    }

    hideFarmhouse(scene) {
        scene.farmhouseText.setText('');
        scene.farmhouseText.setPadding(0);
        scene.farmhouseShown = false;
    }

}
