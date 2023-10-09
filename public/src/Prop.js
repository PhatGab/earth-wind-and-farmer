export default class Prop extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        const { name, scene, x, y, drops, texture, frame, depth } = data;
        super(scene.matter.world, x, y, texture, frame);

        this.name = name;
        this.x += this.width / 2;
        this.y -= this.height / 2;
        this.drops = drops;
        this.depth = depth || 1;

        this._position = new Phaser.Math.Vector2(this.x, this.y);
        this.scene.add.existing(this);
    }

    get position() {
        this._position.set(this.x, this.y);
        return this._position;
    }

    get velocity() {
        return this.body.velocity;
    }
}
