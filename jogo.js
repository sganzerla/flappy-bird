const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');

const contexto = canvas.getContext('2d');

const chao = {

    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    desenha() {
        contexto.drawImage(
            sprites, // image,
            chao.spriteX, chao.spriteY, // sprite x, sprite y,
            chao.largura, chao.altura, // tamanho da sprite sWidth, sHeight,
            chao.x, chao.y, // posicao dentro do canvas
            chao.largura, chao.altura // tamanho dentro do canvas dWidth, dHeight 
        );
        contexto.drawImage(
            sprites, // image,
            chao.spriteX, chao.spriteY, // sprite x, sprite y,
            chao.largura, chao.altura, // tamanho da sprite sWidth, sHeight,
            chao.x + chao.largura, chao.y, // posicao dentro do canvas
            chao.largura, chao.altura // tamanho dentro do canvas dWidth, dHeight 
        );
    }

}



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

    }
}


function loop() {

    flappyBird.desenha();
    chao.desenha();
    requestAnimationFrame(loop);
}

loop();