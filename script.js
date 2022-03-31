let arrCores = ["verde", "amarelo", "vermelho", "azul"];
let ordemCores = []; // guarda a sequencia de cores clicadas
let ordemDosCliques = []; // guarda a sequencia dos cliques


function selecionaEescutaBotoes(){
    botaoVerde = document.getElementById('verde');
    botaoVerde.addEventListener('click',); //aqui vai a função testaCor//

    botaoAmarelo = document.getElementById('amarelo');
    botaoAmarelo.addEventListener('click', );//aqui vai a função testaCor//

    botaoVermelho = document.getElementById('vermelho');
    botaoVermelho.addEventListener('click', ); //aqui vai a função testaCor//

    botaoAzul = document.getElementById('azul');
    botaoAzul.addEventListener('click', ); //aqui vai a função testaCor//

    botaoJogar = document.getElementById('jogar-novamente');
    botaoJogar.addEventListener('click', jogadas);
}

function criarBotoesJogo(){
    let tabuleiroJogo = document.getElementById('jogo');
    tabuleiroJogo.innerHTML = `
    <div id="verde" class="botao"></div>
    <div id="amarelo" class="botao"></div>
    <div id="vermelho"class="botao"></div>
    <div id="azul" class="botao"></div>
    <div><button id="jogar-novamente">Jogar novamente</button></div>
       
    `
}
criarBotoesJogo();

function colorRandom(){ // gera um número aleatório entre 0 e 4 que será o índice correspondente a cada cor
    let random = Math.floor(Math.random() * 4);
    console.log(random);

    let corAtual = arrCores[random];
    ordemDosCliques.push(corAtual);
    console.log(corAtual);

}

function jogadas(){ //chama a colorRandom e itera pelos cliques mudando a cor conforme os cliques
    colorRandom();
       
    for(let i = 0; i < ordemDosCliques.length; i++){
        mudaCor(ordemDosCliques[i]);
    }
}

function mudaCor(cor){ // verifica qual cor clicada e muda a cor conforme o clique e tempo de intervalo
    if(cor == 'verde'){
        botaoVerde.classList.add('muda-cor');
        setTimeout( () => (botaoVerde.classList.remove('muda-cor')), 3000)
    }
    if(cor == 'amarelo'){
        botaoAmarelo.classList.add('muda-cor');
        setTimeout( () => (botaoAmarelo.classList.remove('muda-cor')), 3000)
    }
    if(cor == 'vermelho'){
        botaoVermelho.classList.add('muda-cor');
        setTimeout( () => (botaoVermelho.classList.remove('muda-cor')), 3000)
    }
    if(cor == 'azul'){
        botaoAzul.classList.add('muda-cor');
        setTimeout( () => (botaoAzul.classList.remove('muda-cor')), 3000)
    }

}

// function testaCor(){   ESTOU TERMINANDO ESSA AGORA
//     let corEscolhida = event.target.id;
//     mudaCor(corEscolhida);

//     ordemCores.push(`${corEscolhida}`);

//     if(ordemCores.length === ordemDosCliques.length){

//     }
// }
