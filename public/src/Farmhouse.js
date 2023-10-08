import Prop from "./Prop.js";

export default class Farmhouse extends Prop {

    constructor({ scene }) {

        super({
            scene,
            x: 60, // lol
            y: 380,
            texture: 'Farmhouse'
        });

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const FarmhouseCollider = Bodies.circle(this.x, this.y, 16, { isSensor: false, label: 'FarmhouseCollider' });
        const FarmhouseSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: 'FarmhouseSensor' });

        const compoundBody = Body.create({
            parts: [FarmhouseCollider, FarmhouseSensor],
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
        scene.FarmhouseText.setText(`"Don't collect too many pumpkins!"`);
        scene.FarmhouseText.setDepth(5);
        scene.FarmhouseText.setPadding(10);
        scene.FarmhouseShown = true;
    }

    hideFarmhouse(scene) {
        scene.FarmhouseText.setText('');
        scene.FarmhouseText.setPadding(0);
        scene.FarmhouseShown = false;
    }

}
