
import Inventory from './Inventory.js'

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        const { scene, x, y, texture, frame } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        this.inventory = new Inventory();

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const playerCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'playerCollider' });
        const playerSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();

        this.scene.matter.world.on('collisionstart', (event) => this.collisionHandler(this, event));

    }

    static preload(scene) {
        scene.load.atlas('wizard', 'assets/images/wizard.png', 'assets/images/wizard_atlas.json');
        scene.load.animation('wizard', 'assets/images/wizard_anim.json');
        scene.load.atlas('princess', 'assets/images/princess.png', 'assets/images/princess_atlas.json');
        scene.load.animation('princess', 'assets/images/princess_anim.json');
        scene.load.spritesheet('items','assets/images/items.png', { frameWidth: 32, frameHeight: 32 });
    }

    get velocity() {
        return this.body.velocity;
    }

    collisionHandler(player, e){

        let bumpedPumpkinID = '';

        if (e.pairs.length > 1 && ((e.pairs[1].bodyA.label === 'playerSensor' && e.pairs[1].bodyB.label.startsWith('pumpkinCollider')) || (e.pairs[1].bodyB.label === 'playerSensor' && e.pairs[1].bodyA.label.startsWith('pumpkinCollider')))) {
            console.log('YOU JUST BUMPED A PUMP');
            
            player.inventory.addItem({
                name: 'pumpkin',
                quantity: 1
            });

            if (e.pairs[1].bodyB.label.startsWith('pumpkinCollider')) {
                bumpedPumpkinID = e.pairs[1].bodyB.label;
            } else if (e.pairs[1].bodyA.label.startsWith('pumpkinCollider')) {
                bumpedPumpkinID = e.pairs[1].bodyA.label;
            }
        }

        const pumpkins = player.scene.pumpkins;
        const pumpToRemove = pumpkins?.find(pump => pump.id === bumpedPumpkinID);
        
        if (pumpToRemove) {
            pumpToRemove.destroy();
        }
        
        // JILL -- THIS DOES NOT BELONG IN PLAYER.JS
        const pumpkinQty = player.inventory.getItemQuantity('pumpkin');
        player.scene.counter.setText(pumpkinQty);
        player.scene.counter.setX(255);

        if (pumpkinQty >= 6) {
            player.scene.successText.setText('YOU WIN!');
        }
    };

    update() {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }
        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);
        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
            this.anims.play('princess_walk', true);
        } else {
            this.anims.play('princess_idle', true);
        }
    }
}