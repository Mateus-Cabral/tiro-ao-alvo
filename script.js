var tela = document.querySelector("canvas")
var pincel = tela.getContext("2d")

var xRandom = randomizaPosicao(640)
var yRandom = randomizaPosicao(480)

var scorePlayer = document.getElementById("score")
var precisaoPlayer = document.getElementById("precisao")
var intervaloPlayer = document.getElementById("intervaloPlayer")

var score = 0
var precisao = 0
var totalAlvos = 0

var intervalo = 3000

var raio = 10

function randomizaPosicao(max) {
    return Math.floor(Math.random() * max)
}

function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor
    pincel.beginPath()
    pincel.arc(x, y, raio, 0, 2 * Math.PI)
    pincel.fill()
}

function limpaTela() {
    pincel.clearRect(0, 0, 640, 480)
}

function desenhaAlvo(x, y) {

    desenhaCirculo(x, y, raio + 20, "red")
    desenhaCirculo(x, y, raio + 10, "white")
    desenhaCirculo(x, y, raio, "red")
}

function atualizaTela() {
    limpaTela()
    xRandom = randomizaPosicao(640)
    yRandom = randomizaPosicao(480)
    desenhaAlvo(xRandom, yRandom)
    totalAlvos += 1
    atualizaPrecisao()
}

function atualizaScore() {
    score += 1
    scorePlayer.innerHTML = score
}

function atualizaPrecisao() {
    precisao = (score * 100) / totalAlvos
    precisaoPlayer.innerHTML = precisao + "%"
}

function atualizaTempo() {
    intervalo -= 200
    intervaloPlayer.innerHTML = intervalo
}

function dispara(evento) {
    let xMouse = evento.pageX - tela.offsetLeft
    let yMouse = evento.pageY - tela.offsetTop

    console.log("Random:")
    console.log(xRandom, yRandom)
    console.log("Mouse:")
    console.log(xMouse, yMouse)

    if ((xMouse > xRandom - raio) && (xMouse < xRandom + raio) &&
        (yMouse > yRandom - raio) && (yMouse < yRandom + raio)) {
        clearInterval(intervaloTela)
        atualizaScore()
        atualizaTempo()
        intervaloTela = setInterval(atualizaTela, intervalo)
        atualizaTela()
    }
}

var intervaloTela = setInterval(atualizaTela, intervalo)

tela.onclick = dispara
