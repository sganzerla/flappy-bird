const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');

const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites, // image,
            flappyBird.spriteX, flappyBird.spriteY, // sprite x, sprite y,
            flappyBird.largura, flappyBird.altura, // tamanho da sprite sWidth, sHeight,
            flappyBird.x, flappyBird.y, // posicao dentro do canvas
            flappyBird.largura, flappyBird.altura // tamanho dentro do canvas dWidth, dHeight 
        );
        requestAnimationFrame(loop);
    }
}


function loop() {

    flappyBird.desenha();
}

loop();