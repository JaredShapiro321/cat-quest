var config = {
  type: Phaser.AUTO,
  width: 1088,
  height: 704,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let cursors;
let player;
let showDebug = false;

function preload() {
  this.load.image("player", "assets/dog2.png");
  this.load.image("grass-tiles", "assets/grass-tiles.png");
}

function create() {
  const width = 17;
  const height = 11;
  const scale = 2;

  const level = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      level[i][j] = getRandomInt(3);
    }
  }

  const map = this.make.tilemap({
    data: level,
    tileWidth: 32,
    tileHeight: 32,
  });
  
  const tiles = map.addTilesetImage("grass-tiles");
  const layer = map.createStaticLayer(0, tiles, 0, 0).setScale(scale);

  player = this.physics.add.sprite(400, 350, "player").setScale(scale);

  const anims = this.anims;
  anims.create({
    key: "dog-left-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "dog-left-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "dog-right-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "dog-right-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "dog-front-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "dog-front-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "dog-back-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "dog-back-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });




  cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
  const speed = 150;
  const prevVelocity = player.body.velocity.clone();

  // Stop any previous movement from the last frame
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);

  // Update the animation last and give left/right animations precedence over up/down animations
  //if (cursors.left.isDown) {
 //   player.anims.play("misa-left-walk", true);
  //} else if (cursors.right.isDown) {
  //  player.anims.play("misa-right-walk", true);
  //} else if (cursors.up.isDown) {
  //  player.anims.play("misa-back-walk", true);
  //}/ else if (cursors.down.isDown) {
  //  player.anims.play("misa-front-walk", true);
 // } else {
  //  player.anims.stop();

    // If we were moving, pick and idle frame to use
    //if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
    //else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
    //else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
    //else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
 // }
}

// Misc functions
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max + 1));
}
