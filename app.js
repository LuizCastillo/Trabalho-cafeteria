const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

function lerPrato() {
    const pratosBrutos = fs.readFileSync('pratos.json');
    return JSON.parse(pratosBrutos);
}

function addNovoPrato(novoPedido){
  const pedidos = lerPrato();
  pedidos.push(novoPedido);
  fs.writeFileSync('pratos.json', JSON.stringify(pedidos, null, 2));
  alert('Prato adicionado com sucesso!')
}

app.post('/salvar', (req, res) => {
    const pratoData = req.body;  
    addNovoPrato(pratoData);
    res.send({ alert: 'Prato salvo com sucesso!'});
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
