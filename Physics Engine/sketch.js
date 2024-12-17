let car;
let platforms = [];
const directions = {
  LEFT: 0,
  RIGHT: 1,
  NONE: 2
};

function setup() {
  createCanvas(400, 400);
  car = new Car(75, 50, 25, 25); // x, y, width, height
  car.set_speed(3);
  car.set_jump_height(10);
  car.set_color(color(0, 0, 255));
  car.set_gravity(0.1);

  platforms.push(new Platform(50, 200, 100));
  platforms.push(new Platform(150, 250, 100));
  platforms.push(new Platform(100, 325, 150));
  platforms.push(new Platform(75, 100, 200));
  
  platforms[3].set_moving(true);
  platforms[1].set_moving(true);
}

function draw() {
  background(220);
  for (let i in platforms) {
    platforms[i].draw();
  }
  keyDown();
  car.update();
  car.check_gravity();
  car.draw();
  print(car.gravity, car.forceY);
}

function keyDown() {
  if (keyIsDown(LEFT_ARROW)) {
    car.direction = directions.LEFT;
  } else if (keyIsDown(RIGHT_ARROW)) {
    car.direction = directions.RIGHT;
  } else {
    car.direction = directions.NONE;
  }
}

function keyPressed() {
  if (key == ' ') {
    car.jump();
  }
}

class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.width = width;
    this.height = height;
    this.direction = directions.NONE;
    this.forceY = 0;
    this.gravity = 1;
    this.able_to_jump = false;
    this.jump_height = 25;
    this.c = color(255, 0, 0);
  }
  
  set_speed(speed) { this.speed = speed; }
  set_gravity(gravity) { this.gravity = gravity; }
  set_jump_height(jump) { this.jump_height = jump; }
  set_color(c) { this.c = c; }

  draw() {
    fill(this.c);
    rect(this.x, this.y, this.width, this.height);
  }

  jump() {
    if (this.able_to_jump) {
      this.forceY -= this.jump_height;
    }
  }

  is_on_platform(platform) {
    let adj_height = this.y + this.height;
    let adj_width = this.x + this.width;

    let is_stable_y = adj_height >= platform.y && adj_height <= platform.y + this.forceY;
    let is_stable_x = this.x < platform.x + platform.size && adj_width > platform.x;

    return is_stable_x && is_stable_y;
  }

  check_platform(platform) {
    //   line(0, platform.y + this.forceY, width, platform.y + this.forceY);

    let on_ground = this.at_canvas_boundary();

    // on platform or ground
    if (this.is_on_platform(platform) || on_ground) {
      this.forceY = 0;
      this.y = (on_ground ? height : platform.y) - this.height;
      this.able_to_jump = true;
      return true;
    }

    // falling
    else {
      this.forceY = this.forceY + this.gravity;
 //     this.forceY++;
      this.able_to_jump = false;
      return false;
    }

  }

  at_canvas_boundary() {
    let adj_height = this.y + this.height;
    return adj_height >= height && adj_height <= height + this.forceY;
  }

  check_gravity() {
    for (let i in platforms) {
      if (this.check_platform(platforms[i])) {
        break;
      }
    }
    this.y += this.forceY;
  }

  update() {
    if (this.direction == directions.RIGHT) {
      this.x += this.speed;
    } else if (this.direction == directions.LEFT) {
      this.x -= this.speed;
    }
  }
}

class PlatformMotion {
  constructor() {
    this.moving = false;
    this.is_moving_right = true;
    this.dx = 0;
  }
  update_dx(pixels) {
    if (this.moving) {
      if (this.is_moving_right) {
        this.dx += pixels;
      } else {
        this.dx -= pixels;
      }
      if (this.dx >= 3)
        this.is_moving_right = false;
      if (this.dx <= -3)
        this.is_moving_right = true;
    }
  }
}

class Platform {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.motion = new PlatformMotion();
  }

  set_moving(bool) {
    this.motion.moving = bool;
  }

  draw() {
    this.motion.update_dx(0.1);
    this.x += this.motion.dx;
    if (car.is_on_platform(this)) {
      car.x += this.motion.dx;
    }
    line(this.x, this.y, this.x + this.size, this.y);
  }
}