import Phaser from 'phaser';

// playscene inherits from phaserscene for physics
class PlayScene extends Phaser.Scene {
  constructor() {
    super('Play');
  }

  create() {
    // snow
    this.add.rectangle(480, 520, 960, 40, 0xdfe6f2);
    // sleigh placeholder, 200 left, 150 top, width, height, colour
    this.sleigh = this.add.rectangle(200, 150, 100, 40, 0x8b2a3a);
    // physics body for navigation
    this.physics.add.existing(this.sleigh);
    this.sleigh.body.setAllowGravity(false);     // allows sleigh to fly
    this.sleigh.body.setCollideWorldBounds(true); // sleigh stays on screen
    // sleigh is limited to the sky
    this.physics.world.setBounds(0, 0, 960, 300);

    this.cursors = this.input.keyboard.createCursorKeys();

    // physics settings for houses - spawn every 1.5s, move L at 200pixels/ps
    this.houses = this.physics.add.group({
      allowGravity: false,
      velocityX: -200,
    });

    this.time.addEvent({
      delay: 1500,
      callback: this.spawnHouse,
      callbackScope: this,
      loop: true,
    });
  }
  
    // spawn varied houses starting at the R side of the screen since it's moving L
  spawnHouse() {
    const height = Phaser.Math.Between(80, 160);
    const house = this.add.rectangle(1020, 500 - height / 2, 120, height, 0x3d2f4f);
    this.houses.add(house);
  }

  update() {
    if (this.cursors.up.isDown) {
      this.sleigh.body.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
      this.sleigh.body.setVelocityY(300);
    } else {
      this.sleigh.body.setVelocityY(0);
    }

    // remove houses after they scroll off screen on left
    this.houses.getChildren().forEach((house) => {
      if (house.x < -100) {
        house.destroy();
      }
    });
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