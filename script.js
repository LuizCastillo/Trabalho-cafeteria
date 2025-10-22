const salvar = document.getElementById("salvarBtn");
const nomeInput = document.getElementById("nome");
const precoInput = document.getElementById("preco");
const result = document.getElementById("result");
const calcBtn = document.getElementById("calcBtn");
const addPrato = document.getElementById("add");
const total = document.getElementById('total');

let pratoData = [];
let valorTotal = 0;

addPrato.addEventListener('click', function () {
  const nome = nomeInput.value.trim();
  const preco = parseFloat(precoInput.value);

  const li = document.createElement('li');
  li.innerHTML = `${nome} - R$ ${preco.toFixed(2)}`;
  result.appendChild(li);

  pratoData.push({
    nome: nome,
    preco: preco
  });

  nomeInput.value = '';
  precoInput.value = '';
});

calcBtn.addEventListener('click', function() {
    valorTotal = 0;

    pratoData.forEach(prato => {
    valorTotal += prato.preco;
  });

    total.textContent = valorTotal.toFixed(2);
});

salvar.addEventListener('click', function () {

    const pratoDataFinal = {
        pedidos : pratoData,
        total: valorTotal
    };

  fetch('http://localhost:3000/salvar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pratoDataFinal)
  })

  result.innerHTML = '';
  total.innerHTML = '';
});
