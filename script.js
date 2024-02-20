'use strict'
//https://youtu.be/Yvz_axxWG4Y?si=AOB3ePbxzw45E7Co
const canvas = document.getElementById('canvasA')
const ctx = canvas.getContext('2d')
const particleArr = []
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let SPEED = 1
let SIZE = 55

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

// canvas.addEventListener('mousemove', function (e) {
//   mouse.x = e.x
//   mouse.y = e.y
// })

canvas.addEventListener('contextmenu', function (e) {
  e.preventDefault()
  SPEED = prompt('SET SPEED (BETWEEN 1 - 9)')
  SIZE = prompt('SET SPEED (BETWEEN 10 - 100)')
})

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.fillStyle = 'white'
  ctx.fillRect(10, 20, 150, 50)
})

class Particle {
  constructor() {
    this.x = mouse.x
    // this.y = mouse.y
    // this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = getRand(SIZE)
    this.speedX = Math.random() * SPEED - SPEED/2
    this.speedY = Math.random() * SPEED - SPEED/2
    this.color = getRandColor()
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.size > 0.1) this.size -= 0.02
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

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  handleParticle()
  requestAnimationFrame(animate)
}

function handleParticle() {
  particleArr.forEach((particle, idx) => {
    particle.update()
    particle.draw()
    if (particle.size <= 0.1) {
      particle.size = 20
      setTimeout(() => particleArr.splice(idx, 1), 50)
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

// function drawCircle() {
//   ctx.fillStyle = getRandColor()
//   ctx.beginPath()
//   ctx.arc(mouse.x, mouse.y, getRand(), 0, Math.PI * 2)
//   ctx.fill()
// }

// ctx.fillStyle = 'white'
// ctx.strokeStyle = 'red'
// ctx.lineWidth = 10
// ctx.fillRect(10,20,150,50)
// ctx.fillStyle = 'red'
// ctx.beginPath()
// ctx.arc(100, 100, 50 , 0, 10)
// ctx.fill()
// ctx.stroke()
