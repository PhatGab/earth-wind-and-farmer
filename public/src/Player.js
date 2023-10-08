
import Inventory from './Inventory.js'
import MonstantoEmployee from './MonsantoEmployee.js';

import { fontFamily } from './constants.js';

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        const { scene, x, y, texture, frame, id, depth } = data;
        super(scene.matter.world, x, y, texture, frame, id, depth);
        this.scene.add.existing(this);

        this.inventory = new Inventory();

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const playerCollider = Bodies.circle(this.x, this.y, 8, { isSensor: false, label: id + 'playerCollider' });
        const playerSensor = Bodies.circle(this.x, this.y, 16, { isSensor: true, label: id + 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();

        this.scene.matter.world.on('collisionstart', (event) => this.collisionHandler(this, event));
        this.scene.matter.world.on('collisionactive', (event) => this.interactWithNPC(this, event));

        this.scene.matter.world.on('collisionend', (event) => this.interactWithSign(this, event));

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

        if (e.pairs.length > 1 && ((e.pairs[1].bodyA.label.startsWith('playerCharacter') && e.pairs[1].bodyB.label.startsWith('pumpkinCollider')) || (e.pairs[1].bodyB.label.startsWith('playerCharacter') && e.pairs[1].bodyA.label.startsWith('pumpkinCollider')))) {
            
            player.inventory.addItem({
                name: 'pumpkin',
                quantity: 1
            });

            if (e.pairs[1].bodyB.label.startsWith('pumpkinCollider')) {
                bumpedPumpkinID = e.pairs[1].bodyB.label;
            } else if (e.pairs[1].bodyA.label.startsWith('pumpkinCollider')) {
                bumpedPumpkinID = e.pairs[1].bodyA.label;
            }

            const pumpkins = player.scene.pumpkins;
            const pumpToRemove = pumpkins?.find(pump => pump.id === bumpedPumpkinID);
            
            if (pumpToRemove) {
                pumpToRemove.destroy();
            }
            
            // JILL -- THIS DOES NOT BELONG IN PLAYER.JS
            const pumpkinQty = player.inventory.getItemQuantity('pumpkin');
    
            if (pumpkinQty !== 0) {
                player.scene.pumpkinText.setText("Pumpkins:");
                player.scene.pumpkinText.setX(200);
                player.scene.counter.setText(pumpkinQty);
                player.scene.counter.setX(255);
            }
    
            if (pumpkinQty == 5 && !player.scene.employeeShown) {
                const playerCoordinates = e.pairs[1].bodyA.position;

                player.scene.employeeShown = true;

                const employee = new MonstantoEmployee({scene: player.scene, x: 50, y: 50, texture: 'employee', frame: 'townsfolk_f_idle_1', id: 'employee', playerCoordinates});
                employee.enterScene(player);
            }
        } 
        else if (e.pairs.length > 1 && ((e.pairs[1].bodyA.label.startsWith('playerCharacter') && e.pairs[1].bodyB.label === 'signCollider') || (e.pairs[1].bodyB.label.startsWith('playerCharacter') && e.pairs[1].bodyA.label === 'signCollider'))) {
            player.scene.sign.readSign(player.scene);
            player.scene.signShown = true;

            setTimeout(() => {
                if (player.scene.signShown) {
                    player.scene.sign.hideSign(player.scene);
                }
            }, 5000);
        } 
    };

    interactWithNPC(player, e) {
        if (!player.scene.npcTextShown && e.pairs.length > 1 && ((e.pairs[1].bodyA.label.startsWith('playerCharacter') && e.pairs[1].bodyB.label === 'NPCplayerSensor') || (e.pairs[1].bodyB.label.startsWith('playerCharacter') && e.pairs[1].bodyA.label === 'NPCplayerSensor'))) {
            let npcPosition = 0;

            if (e.pairs[1].bodyB.label === 'NPCplayerSensor') {
                npcPosition = e.pairs[1].bodyB.position;
            } else {
                npcPosition = e.pairs[1].bodyAds.position;
            }
            player.scene.npcText = player.scene.add.text(npcPosition.x - 10, npcPosition.y - 30, `"So many pumpkins! Maybe...too many?"`, {
                fontFamily: fontFamily,
                fontSize: '12px',
                color: 'black',
                wordWrap: { width: 150, useAdvancedWrap: true }
            });
            player.scene.npcTextShown = true;

            setTimeout(() => {
                player.scene.npcText.visible = false;
                player.scene.npcTextShown = false;
            }, 3000);

            player.scene.npcBumpCounter++;
        }

        if (player.scene.npcBumpCounter === 5) {
            player.scene.npcText.setText("STOP BUMPING ME!");
            player.scene.npcText.setFont('Georgia, "Goudy Bookletter 1911", Times, serif');
            player.scene.npcText.setFontSize('18px');
            player.scene.npcText.setAngle(12.5);
            player.scene.npcTextShown = true;

            setTimeout(() => {
                player.scene.npcText.visible = false;
                player.scene.npcTextShown = false;
            }, 3000);
        }

    }

    interactWithSign(player, e) {
        if (e.pairs.length > 1 && ((e.pairs[1].bodyA.label.startsWith('playerCharacter') && e.pairs[1].bodyB.label === 'signCollider') || (e.pairs[1].bodyB.label.startsWith('playerCharacter') && e.pairs[1].bodyA.label === 'signCollider'))) {
            player.scene.sign.hideSign(player.scene);
        }
    }

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