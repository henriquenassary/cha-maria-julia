import Participantes from "./Participantes.js";
const participantes = new Participantes();


//capturaDados
document.querySelector("#btnCapturarDados").addEventListener("click", () => {
  document.querySelector("#containerDados").innerHTML = JSON.stringify(participantes,undefined, 4);
});

const btnGeraNumero = document.querySelector('[data-gera="numero"]');
const mostraNumeroAleatorio = document.querySelector('.numero-aleatorio');
const mostraPremiado = document.querySelector('.premiado');
btnGeraNumero.addEventListener('click', () => {
  let min = Math.ceil(1);
  let max = Math.floor(211);
  const mostraNumber =  Math.floor(Math.random() * (max - min) + min);
  mostraNumeroAleatorio.innerText = mostraNumber;
  iniciarAsync(mostraNumber);
});


//async e await
async function iniciarAsync(number) {
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
        mostraPremiado.innerHTML = `Parabéns <span>${nome}</span> seu numero premiado foi o : <span>${numero}</span>` ;
      }
      else {
        mostraPremiado.innerHTML = `Numero ainda disponivel para compra!` ;
      }
    }
  });
  
}

async function numerosDisponiveis() {
  const dadosResponse = await fetch('./json/lista-participantes.json');
  const dadosJson = await dadosResponse.json();
  const numerosDisponiveis = document.querySelector(".numeros-disponiveis");
  
  const paragrafoTotal = document.createElement("h2");

  dadosJson.forEach((item) => {
    const nome = item.nome;
    if(nome == "") {
      const paragrafo = document.createElement("spam");
      const conteudo = document.createTextNode(` ${item.numero} - `);
      paragrafo.appendChild(conteudo);
      numerosDisponiveis.appendChild(paragrafo);
      numerosDisponiveis.appendChild(paragrafoTotal);
    }
  });

  const totalItens = dadosJson.filter(item => {
    return (item.nome === '');
  });

  const totalNumerosDisponiveis = document.querySelector(".numeros-disponiveis h2");
  if(totalNumerosDisponiveis) {
    totalNumerosDisponiveis.classList.add('d-block')
    totalNumerosDisponiveis.innerText = `Total de números disponíveis : ${totalItens.length}`;
  }
  
}

const btnNumeroDisponiveis = document.querySelector('[data-btn="numeros-disponiveis"]');
btnNumeroDisponiveis.addEventListener('click', () => {
  numerosDisponiveis();
  btnNumeroDisponiveis.disabled = true;
});

