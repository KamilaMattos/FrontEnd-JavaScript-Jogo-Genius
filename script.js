const main = document.getElementById('main')
const h1 = document.createElement('h1')
h1.innerText= 'Genius'

const sectionGame = document.getElementById('game')
sectionGame.innerHTML= `
<div class="clicaveis top-left round-corner" id="yellow"></div>
<div class="clicaveis top-right round-corner" id="blue"></div>

<div class="clicaveis bottom-left round-corner" id="red"></div>
<div class="clicaveis bottom-right round-corner" id="green"></div>

<div class="area-container center">
    <div class="area-centro center">
        <div class="background">

        </div>
        <p>
            COMEÇAR
        </p>
    </div>
</div>  
`
main.appendChild(h1)
main.appendChild(sectionGame)

const colorButtons = document.querySelectorAll('.clicaveis');
const centerElement = document.querySelector('.area-centro .background');
const controlStatus = document.querySelector('.area-centro p');
const scoreElement = document.querySelector('.score');
const container = document.querySelector('.container');


let sequenciaRandom = [];
let sequenciaJogador = [];
let nivelDificuldade = 4;
let intervaloContagem = 0;
let pontuacao = 0;

let esperarResposta = false;
let iniciarRodada = true;

const numeroRandomArr = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const mostrarSequencia = (index) => {
    const element = sequenciaRandom[index];

    setTimeout(() => {
        element.classList.add('active');

        setTimeout(() => {
            element.classList.remove('active');
            index++;

            if (index < sequenciaRandom.length) {
                mostrarSequencia(index);
            } else {
                esperarResposta = true;

                centerElement.style.backgroundColor = 'lightblue';
                controlStatus.innerHTML = 'REPRODUZA';

                mudaEstiloCursor();
            }
        }, 1000 - intervaloContagem)
    }, 1000 - intervaloContagem)
};

const novaRodada = () => {
    sequenciaJogador = [];

    centerElement.style.cursor = 'auto';
    centerElement.style.backgroundColor = 'yellow';
    controlStatus.innerHTML = 'OBSERVE';

    const limiteDoLoop = nivelDificuldade - sequenciaRandom.length;

    for (let i = 0; i < limiteDoLoop; i++) {
        const valorRandom = numeroRandomArr(colorButtons);

        sequenciaRandom.push(valorRandom);
    }

    mostrarSequencia(0);
};

const mudaEstiloCursor = () => {
    for (let element of colorButtons) {
        element.style.cursor = element.style.cursor === 'pointer' ? '' : 'pointer';
    }
};

const aumentarDificuldade = (aumentar) => {
    if (aumentar) {
        nivelDificuldade++;
        intervaloAumento = (intervaloAumento < 800) ? intervaloAumento + 10 : intervaloAumento;
    } else {
        nivelDificuldade = 4;
        intervaloAumento = 0;
    }
};


const atualizaPontos = () => {
    scoreElement.innerHTML = pontuacao;
};

const processarRespostas = () => {
    esperarResposta = false;

    mudaEstiloCursor();

    let acertou = true;

    for (let i in sequenciaRandom) {
        const respostaCerta = sequenciaRandom[i];
        const respostaJogador = sequenciaJogador[i];

        if (respostaCerta !== respostaJogador) {
            acertou = false;
        }
    }

    if (acertou) {
        centerElement.style.cursor = 'pointer';
        centerElement.style.backgroundColor = 'green';

        controlStatus.innerHTML = 'ACERTOU';

        setTimeout(() => {
            novaRodada()
        }, 1500);
    } else {
        centerElement.style.cursor = 'pointer';
        centerElement.style.backgroundColor = 'red';

        controlStatus.innerHTML = 'RECOMEÇAR';
        
        iniciarRodada = true;
    }

    pontuacao = (acertou) ? pontuacao + 1 : pontuacao;
    pontuacao = (acertou) ? pontuacao : 0;

    atualizaPontos();
    aumentarDificuldade(acertou);
   
};

const clique = (element) => {
    if (!esperarResposta) {
        return;
    }

    sequenciaJogador.push(element);
    element.classList.add('active');

    setTimeout(() => {
        element.classList.remove('active');
    }, 750);

    const i = sequenciaJogador.length - 1;

    if (sequenciaJogador[i] !== sequenciaRandom[i] || sequenciaJogador.length === sequenciaRandom.length) {
        processarRespostas();
    }
};

centerElement.onclick = () => {
    if (iniciarRodada) {
        novaRodada();

        iniciarRodada = false;
    }
};

for (let element of colorButtons) {
    element.onclick = () => {
        clique(element);
    };

    element.onmouseenter = () => {
        if (esperarResposta && !element.classList.contains('active')) {
            element.classList.add('hover');
        }
    };

    element.onmouseleave = () => {
        if (esperarResposta && !element.classList.contains('active')) {
            element.classList.remove('hover');
        }
    }
}