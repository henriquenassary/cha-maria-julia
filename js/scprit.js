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
  let max = Math.floor(201);
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
        mostraPremiado.innerHTML = `Parabéns <span class="text-primary">${nome}</span> seu numero premiado ${numero}` ;
      }
      else {
        mostraPremiado.innerHTML = `Numero ainda disponivel para compra!` ;
      }
    }
  });
  
}

const imgSorteio = document.querySelector("[data-img='sorteio']");
imgSorteio.addEventListener('click', () => {
  imgSorteio.classList.add('zoom-in');
})

