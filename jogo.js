const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');

const contexto = canvas.getContext('2d');

const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - (174 / 2),
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites, // image,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY, // sprite x, sprite y,
            mensagemGetReady.largura, mensagemGetReady.altura, // tamanho da sprite sWidth, sHeight,
            mensagemGetReady.x, mensagemGetReady.y, // posicao dentro do canvas
            mensagemGetReady.largura, mensagemGetReady.altura // tamanho dentro do canvas dWidth, dHeight 
        );

    }
}

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    desenha() {

        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites, // image,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // sprite x, sprite y,
            planoDeFundo.largura, planoDeFundo.altura, // tamanho da sprite sWidth, sHeight,
            planoDeFundo.x, planoDeFundo.y, // posicao dentro do canvas
            planoDeFundo.largura, planoDeFundo.altura // tamanho dentro do canvas dWidth, dHeight 
        );
        contexto.drawImage(
            sprites, // image,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // sprite x, sprite y,
            planoDeFundo.largura, planoDeFundo.altura, // tamanho da sprite sWidth, sHeight,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, // posicao dentro do canvas
            planoDeFundo.largura, planoDeFundo.altura // tamanho dentro do canvas dWidth, dHeight 
        );
    }

}

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
            (chao.x + chao.largura), chao.y, // posicao dentro do canvas
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
    velocidade: 0,
    gravidade: 0.25,

    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

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

let telaAtiva = {};

function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
}

const Telas = {

    INICIO: {

        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        atualiza() {

        }
    },

    JOGO: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
        },
        atualiza() {
            flappyBird.atualiza();
        }

    }

}




function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop);
}

mudaParaTela(Telas.INICIO);

loop();