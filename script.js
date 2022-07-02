//Seletores e variáveis
var palavras = ['ALURA', 'ORACLE', 'HTML', 'JAVASCRIPT', 'CSS'];
var tabuleiro = document.getElementById('forca').getContext('2d');
var letras = [];
var palavraCorreta = "";
var erros = 0;
var c = document.getElementById("forca");
var ctx = c.getContext("2d");
var erro = 0;
var acertos = 0;

desenhaPoste();
desenharBarraSuperior();
desenharBarraInferior()
desenhaApoio();


//escolher palavras aleatórias
function escolherPalavraSecreta(){
    var palavra = palavras[Math.floor(Math.random()*palavras.length)]
    palavraSecreta = palavra
    console.log(palavra)
    return palavra
}

//desenhando traços com canvas
function escreverTracinhos(){
    tabuleiro.LineWidth = 6
    tabuleiro.LineCap = "round"
    tabuleiro.lineJoin = "round"
    tabuleiro.strokeStyle = "#0A3871"
    tabuleiro.beginPath()
    var eixo = 600/palavraSecreta.length
    for(let i=0; i < palavraSecreta.length; i++){
        tabuleiro.moveTo(500+(eixo*i),640)
        tabuleiro.lineTo(550+(eixo*i),640)

    }
    tabuleiro.stroke()
    tabuleiro.closePath()
}

escreverTracinhos(escolherPalavraSecreta())

function escreverLetraCorreta(index) {
    tabuleiro.font = 'bold 52px Inter';
    tabuleiro.LineWidth = 6
    tabuleiro.LineCap = "round"
    tabuleiro.lineJoin = "round"
    tabuleiro.strokeStyle = "#0A3871"
    var eixo = 600/palavraSecreta.length
    tabuleiro.fillText(palavraSecreta[index],505+(eixo*index), 620)
    tabuleiro.stroke()
}

function escreverLetraIncorreta(letra, errorsLeft){
    tabuleiro.font = '52px Inter';
    tabuleiro.LineWidth = 6
    tabuleiro.LineCap = "round"
    tabuleiro.lineJoin = "round"
    tabuleiro.strokeStyle = "#0A3871"
    tabuleiro.fillText(letra, 225+(40*(10-errorsLeft)), 710, 20)
}

function verificarLetraCorreta(key){
    if(letras.Length < 1 || letras.indexOf(key) < 0){
        console.log(key)
        letras.push(key)
        return false

    }
    else{
        letras.push(key.toUpperCase())
        return true
    }
}

function adicionarLetraCorreta(i){
    
}

function adicionarLetraIncorreta(letter){
    if(palavraSecreta.indexOf(letter) <= 0) {
        erros -= 1
        erro += 1
    }
}


function desenhaPoste(){
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 550);
    ctx.stroke();
}

function desenharBarraInferior() {
    ctx.moveTo(50, 550);
    ctx.lineTo(550, 550);
    ctx.stroke();
}

function desenharBarraSuperior() {
    ctx.moveTo(100, 100);
    ctx.lineTo(400, 100);
    ctx.stroke();
}

function desenhaApoio() {
    ctx.moveTo(400, 100);
    ctx.lineTo(400, 200);
    ctx.stroke();
}

document.onkeydown = (e) => {
    var letra=e.key.toUpperCase()
    if(!verificarLetraCorreta(e.key)){
        if(palavraSecreta.includes(letra)){
            adicionarLetraCorreta(palavraSecreta.indexOf(letra))
            for(let i =0; i < palavraSecreta.length; i++){
                if(palavraSecreta[i] === letra) {
                    escreverLetraCorreta(i)
                    acertos += 1
                    
                    
                }
            }
        }

    else{
        if (!verificarLetraCorreta(e.key)) 
        return
        adicionarLetraIncorreta(letra)
        escreverLetraIncorreta(letra,erros)
        desenhaBoneco(erro)
        }
    }
    console.log(acertos);
    console.log(erro);
    verificaFimJogo()

}

function verificaFimJogo() {
    if (erro >= 6) {
        ctx.font = "35px Arial";
        ctx.fillStyle = '#0A3871';
        ctx.fillText("Você perdeu!! A palavra era: " + palavraSecreta, 500,100);
        //window.location.reload();
        window.onkeydown = null;
        //alert("Fim");
        window.onkeypress = null;
        return false; 
        

        
        //return;
    }

    if (acertos == palavraSecreta.length) {
        ctx.font = "35px Arial";
        ctx.fillStyle = '#0A3871';
        ctx.fillText("Você venceu!!", 500, 100);
        //window.location.reload();
        window.onkeydown = null;
        //alert("Fim");
        window.onkeypress = null;
        return false; 
        
        //return;
    }
}

function desenhaBoneco(erro) {
    switch (erro) {
        case 1:
            desenhaCabeca();
            break;
        case 2:
            desenhaTronco();
            break;
        case 3:
            desenhaBracoEsquerdo();
            break;
        case 4:
            desenhaBracoDireito();
            break;
        case 5:
            desenhaPernaEsquerda();
            break;
        case 6:
            desenhaPernaDireita();
            break;
    }
}

function desenhaCabeca() {
    ctx.beginPath();
    ctx.arc(400, 250, 50, 0, 2 * Math.PI);
    ctx.stroke();
}

function desenhaTronco() {
    ctx.moveTo(400, 300);
    ctx.lineTo(400, 400);
    ctx.stroke();
}

function desenhaBracoEsquerdo() {
    ctx.moveTo(300, 300);
    ctx.lineTo(400, 350);
    ctx.stroke();
}

function desenhaBracoDireito() {
    ctx.moveTo(400, 350);
    ctx.lineTo(500, 300);
    ctx.stroke();
}

function desenhaPernaEsquerda() {
    ctx.moveTo(400, 400);
    ctx.lineTo(350, 500);
    ctx.stroke();
}

function desenhaPernaDireita() {
    ctx.moveTo(400, 400);
    ctx.lineTo(450, 500);
    ctx.stroke();
}

function NovoJogo() {
    window.location.reload();
}

function Desistir() {
    ctx.font = "35px Arial";
    ctx.fillStyle = '#0A3871';
    ctx.fillText("Você perdeu!! A palavra era: " + palavraSecreta, 500,100);
    window.onkeydown = null;
    window.onkeypress = null;
    return false; 
    window.location.reload();
}

