'use strict'

const canvas = document.getElementById('canvasA')
const ctx = canvas.getContext('2d')
const particleArr = []
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
  x: undefined,
  y: undefined,
}

canvas.addEventListener('click', function (e) {
  init(120)
  mouse.x = e.x
  mouse.y = e.y
  particleArr.push(new Particle())
})

canvas.addEventListener('mousemove', function (e) {
  mouse.x = e.x
  mouse.y = e.y
})

// function drawCircle() {
//   ctx.fillStyle = getRandColor()
//   ctx.beginPath()
//   ctx.arc(mouse.x, mouse.y, getRand(), 0, Math.PI * 2)
//   ctx.fill()
// }

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.fillStyle = 'white'
  ctx.fillRect(10, 20, 150, 50)
})

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  handleParticle()
  requestAnimationFrame(animate)
}

class Particle {
  constructor() {
    this.x = mouse.x
    this.y = mouse.y
    // this.x = Math.random() * canvas.width
    // this.y = Math.random() * canvas.height
    this.size = getRand(60)
    this.speedX = Math.random() * 6 - 3
    this.speedY = Math.random() * 6 - 3
    this.color = getRandColor()
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if(this.size > 0.1) this.size -= .1
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function init(n = 100) {
  for (let i = 0; i < n; i++) {
    particleArr.push(new Particle())
  }
  animate()
}

function handleParticle() {
  particleArr.forEach((particle,idx) => {
    particle.update()
    particle.draw()
    if(particle.size <= .1){
        particle.size = 20
        setTimeout(() => particleArr.splice(idx,1),50)
    } 
  })
}

//===== UTIL ======
function getRandColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

function getRand(n = 100) {
  return Math.random() * n
}

// ctx.fillStyle = 'white'
// ctx.strokeStyle = 'red'
// ctx.lineWidth = 10
// ctx.fillRect(10,20,150,50)
// ctx.fillStyle = 'red'
// ctx.beginPath()
// ctx.arc(100, 100, 50 , 0, 10)
// ctx.fill()
// ctx.stroke()
