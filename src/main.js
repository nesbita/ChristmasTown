import Phaser from 'phaser';

// playscene inherits from phaserscene for physics
class PlayScene extends Phaser.Scene {
  constructor() {
    super('Play');
  }

  create() {
    // sleigh placeholder, 200 left, 150 top, width, height, colour
    this.sleigh = this.add.rectangle(200, 150, 100, 40, 0x8b2a3a);

    // physics body for navigation
    this.physics.add.existing(this.sleigh);
    this.sleigh.body.setAllowGravity(false);     // allows sleigh to fly
    this.sleigh.body.setCollideWorldBounds(true); // sleigh stays on screen

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.up.isDown) {
      this.sleigh.body.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
      this.sleigh.body.setVelocityY(300);
    } else {
      this.sleigh.body.setVelocityY(0);
    }
  }
}

// creates game
new Phaser.Game({
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  backgroundColor: '#16122e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }, // for presents
      debug: true,         // shows physics outlines
    },
  },
  scene: [PlayScene],
});