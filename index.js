let canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
for (let i = 0; i < 6; i++) {
  let timeOut = Math.random() * 2000;
  setTimeout(spawnFireWork, timeOut);
}

function spawnFireWork() {
  let color = {
    R: Math.floor(Math.random() * 255),
    G: Math.floor(Math.random() * 255),
    B: Math.floor(Math.random() * 255),
  };
  fireworks.push(
    new fireWork(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      10,
      color,
      0,
      0,
      0.1
    )
  );
}

console.log(fireworks[0]);
draw();
function draw() {
  ctx.fillStyle = "rgba(0, 0, 13, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //Draw text in center of canvas
  let now = new Date();
  let NYE = new Date(now.getFullYear(), 11, 31, 24, 0, 0);
  let remaining = Math.floor((NYE - now) / 1000);
  let hours = Math.floor(remaining / (60 * 60));
  remaining = remaining % (60 * 60);
  let minutes = Math.floor(remaining / 60);
  remaining = remaining % 60;
  let seconds = remaining;
  //remaining time as string
  let timeString = `${hours} : ${minutes} : ${seconds}`;

  ctx.font = "100px Arial";
  ctx.textAlign = "center";
  remaining = 0;
  if (remaining <= 0) {
    for (let i = 0; i < fireworks.length; i++) {
      if (fireworks[i].done) {
        fireworks.splice(i, 1);
        timeOut = Math.random() * 2000;
        setTimeout(spawnFireWork, timeOut);
        console.log("done");
      } else {
        fireworks[i].draw();
      }
    }
    ctx.fillStyle = "white";
    ctx.fillText("HAPPY NEW YEAR", canvas.width / 2, canvas.height / 2);
  } else {
    ctx.fillStyle = "white";
    ctx.fillText(timeString, canvas.width / 2, canvas.height / 2);
  }

  requestAnimationFrame(draw);
}

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
