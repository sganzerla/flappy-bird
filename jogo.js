let frames = 0;

const somHit = new Audio();
somHit.src = './resources/sons/hit.wav';

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
function criaChao() {

    const chao = {

        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,

        atualiza() {
            const movimentoDoChao = 1;

            const repeteEm = chao.largura / 2;

            const movimentacao = chao.x - movimentoDoChao;

            chao.x = movimentacao % repeteEm;
        },
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
    return chao;
}

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    }
}

function criaFlappyBird() {


    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        velocidade: 0,
        gravidade: 0.25,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
        atualiza() {

            if (fazColisao(flappyBird, globais.chao)) {
                somHit.play();

                setTimeout(() => { }, 500);
                mudaParaTela(Telas.INICIO);

            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },

        movimentos: [
            {
                spriteX: 0,
                spriteY: 0,
            },
            {
                spriteX: 0,
                spriteY: 26,
            },
            {
                spriteX: 0,
                spriteY: 52,
            },
            {
                spriteX: 0,
                spriteY: 26,
            },

        ],
        frameAtual: 0,
        atualizaOFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            if (passouOIntervalo) {

                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;

                flappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        desenha() {
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

            contexto.drawImage(
                sprites, // image,
                spriteX, spriteY, // sprite x, sprite y,
                flappyBird.largura, flappyBird.altura, // tamanho da sprite sWidth, sHeight,
                flappyBird.x, flappyBird.y, // posicao dentro do canvas
                flappyBird.largura, flappyBird.altura // tamanho dentro do canvas dWidth, dHeight 
            );

        }
    }
    return flappyBird;
}

const globais = {};
let telaAtiva = {};

function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

function criaCanos() {

    const canos = {

        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {

            canos.pares.forEach(function (par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;
                // cano ceu
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura
                );
                //cano do chao
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;

                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura
                );

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY,
                };

                par.canoChao = {
                    x: canoChaoX,
                    y: canos.altura + canoChaoY,
                };
            });
        },
        temColisaoComOFlappyBird(par) {

            const cabecaDoFlappy = globais.flappyBird.y;

            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if (globais.flappyBird.x >= par.x) {

                if (cabecaDoFlappy <= par.canoCeu.y)
                    return true;

                if (peDoFlappy >= par.canoChao.y)
                    return true;
            }
            return false;

        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function (par) {
                par.x = par.x - 2;

                if (canos.temColisaoComOFlappyBird(par)) {
                    somHit.play();
                    setTimeout(() => { }, 500);
                    mudaParaTela(Telas.INICIO);

                }

                if (par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            });
        }
    };

    return canos;
}


const Telas = {

    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    },

    JOGO: {
        desenha() {
            planoDeFundo.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
        },
        click() {
            globais.flappyBird.pula();
        },
        atualiza() {
            globais.canos.atualiza();
            globais.chao.atualiza();
            globais.flappyBird.atualiza();
        },

    }

}



function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();
    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);

loop();