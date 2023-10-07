import Prop from "./Prop.js";

export default class Pumpkin extends Prop {

    constructor(data) {
        const { scene, pumpkinConfig } = data;

        super({
            name: pumpkinConfig.type,
            id: pumpkinConfig.id,
            scene,
            x: pumpkinConfig.x,
            y: pumpkinConfig.y,
            zIndex: 1
        });

        this.id = pumpkinConfig.id;

        this.y = this.y + this.height * (0 - 0.5);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const pumpkinCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: `${this.id}`});
        const pumpkinSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: 'pumpkinSensor' });

        const compoundBody = Body.create({
            parts: [pumpkinCollider, pumpkinSensor],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
        this.setStatic(true);
        this.setOrigin(0.5, 0);

   }

    static preload(scene) {
        scene.load.image('pumpkin', 'assets/images/pumpkin.png');
        scene.load.atlas('foliage', 'assets/images/foliage.png', 'assets/images/foliage_atlas.json');
    }

    update() {

    }

}