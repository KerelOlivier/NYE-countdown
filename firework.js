class fireWork {
  constructor(x, y, r, color, speed, angle, gravity) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.speed = speed;
    this.angle = angle;
    this.gravity = gravity;
    this.Particles = [];
    this.done = false;
    //fill particles
    let life = Math.random() * 50 + 40;
    for (let i = 0; i < 100; i++) {
      let vx = 10 * Math.cos((i * (Math.PI * 2)) / 100);
      let vy = 10 * Math.sin((i * (Math.PI * 2)) / 100);
      
      this.Particles.push(new Particle(this.x, this.y, this.color, vx, vy, life));
    }
  }

  draw(ctx) {
    //Draw particles on ctx and update position
    for (let i = 0; i < this.Particles.length; i++) {
      //draw particle on ctx
      if (this.Particles[i].life > 0) {
        this.Particles[i].draw(ctx);
        this.Particles[i].update();
      } else {
        this.done = true;
      }
    }
  }

  update() {
    this.speed += this.gravity;
    this.y += this.speed;
    this.draw();
  }
}

class Particle {
  constructor(x, y, color, dirX, dirY, life) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.dir = { x: dirX, y: dirY };
    this.gravity = 0.1;
    this.life = life;
    this.oLife = life;
  }

  //Update particle position based on gravity
  update() {
    this.dir.y += this.gravity;
    this.life -=1;
    this.x += this.dir.x;
    this.y += this.dir.y;
  }
  draw() {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, 5, 5, 0, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${this.color.R}, ${this.color.G}, ${this.color.B},${this.life/this.oLife})`;

    ctx.fill();
  }
}
