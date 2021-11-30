import Participantes from "./Participantes.js";
const participantes = new Participantes();


//capturaDados
document.querySelector("#btnCapturarDados").addEventListener("click", () => {
  document.querySelector("#containerDados").innerHTML = JSON.stringify(participantes,undefined, 4);
});

const btnPrimeiroGanhador = document.querySelector('[data-gera="numero"]');
const btnSegundoGanhador = document.querySelector('[data-gera="segundo"]');
const primeiroNumero = document.querySelector('.primeiro-numero');
const segundoNumero = document.querySelector('.segundo-numero');
const primeiroGanhador = document.querySelector('.primeiro-ganhador');
const segundoGanhador = document.querySelector('.segundo-ganhador');
const contentOne = document.querySelector('.model-one');
const contentTwo = document.querySelector('.model-two');
let mostraNumber;
btnPrimeiroGanhador.addEventListener('click', geraPrimeiroGanhador);
btnSegundoGanhador.addEventListener('click', geraSegundoGanhador);
const primeiro = 'primeiro';
const segundo = 'segundo';

function geraNumberClick() {
  let min = Math.ceil(1);
  let max = Math.floor(231);
  mostraNumber = Math.floor(Math.random() * (max - min) + min);
}

function geraPrimeiroGanhador() {
  geraNumberClick();
  iniciarAsync(mostraNumber, primeiro);
  primeiroNumero.innerHTML = `O primeiro número sorteado foi o : <b>${mostraNumber}</b>`;
}

function geraSegundoGanhador() {
  geraNumberClick();
  iniciarAsync(mostraNumber, segundo);
  segundoNumero.innerHTML = `O segundo número sorteado foi o : <b>${mostraNumber}</b>`;
}


//async e await
async function iniciarAsync(number, content) {
  
  const dadosResponse = await fetch('./json/lista-participantes.json');
  const dadosJson = await dadosResponse.json();
  document.querySelector("#btnCapturarDados").addEventListener("click", () => {
    document.querySelector("#containerDados").innerHTML = JSON.stringify(dadosJson,undefined, 4);
  });

  dadosJson.forEach((item) => {
    const nome = item.nome;
    const numero = item.numero;
    if(number == item.numero) {
      if(item.nome != "") {
        if(content == 'primeiro') {
          contentOne.classList.remove('d-none');
          primeiroGanhador.innerHTML = `<b>1º ganhador:</b> Parabéns <span>${nome}</span> seu número premiado foi o : <span>${numero}</span>` ;
          btnPrimeiroGanhador.disabled = true;
        } else if(content == 'segundo') {
          contentTwo.classList.remove('d-none');
          segundoGanhador.innerHTML = ` <b>2º ganhador:</b> Parabéns <span>${nome}</span> seu número premiado foi o : <span>${numero}</span>`;
          btnSegundoGanhador.disabled = true;

        }
        
        
      }
    }
  });
  
}

async function devedores() {
  const dadosResponse = await fetch('./json/lista-participantes.json');
  const dadosJson = await dadosResponse.json();
  const containerDebitos = document.querySelector('.containerDebitos');
  const debitosTotal = document.createElement("h2");

  const totalDevedor = dadosJson.filter(item => {
    return (item.situacao === 'NÃO PAGO' && item.nome != "");
  });

  dadosJson.forEach((item) => {
    const situacao = item.situacao;
    if(situacao == "NÃO PAGO" && item.nome != "") {
      
      const paragrafo = document.createElement("spam");
      const conteudo = document.createTextNode(` ${item.nome} - R$10,00 | `);
      paragrafo.appendChild(conteudo);
      containerDebitos.appendChild(paragrafo);
      containerDebitos.appendChild(debitosTotal);
      
    }
  });

  const somaTotal = parseInt(totalDevedor.length) * 10;
  
  debitosTotal.innerText = `Total para receber : R$${somaTotal},00`;

}

const btnVerificaDebitos = document.querySelector('#btnVerificaDebito');
btnVerificaDebitos.addEventListener('click', () => {
  devedores();
  btnVerificaDebitos.disabled = true;
});

