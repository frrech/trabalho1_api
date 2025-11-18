const clienteRepository = require('./cliente_repository')
class Conta{
    constructor(id, cliente, saldo){
        this.id = id;
        this.cliente = cliente;
        this.saldo = saldo;
    }
}
let autoIncrementId = 1;
let contas = [];

async function createConta(cliente, saldo){
    const newCliente = await clienteRepository.createCliente(cliente);
    const conta = new Conta(autoIncrementId++, newCliente, saldo);
    contas.push(conta);
    return conta;
}

function findContaByIndex(id){
    const nid = Number(id);
    return contas.find(conta => conta.id === nid);
}

function getAllContas(){
    return contas;
}

function updateConta(id, conta){
   const idx = contas.findIndex(c => c.id === Number(id));
    if (idx !== -1) {
        contas[idx] = { ...contas[idx], ...conta, id: contas[idx].id };
        return true;
    }
    return false;
}

function deleteConta(id){
    const idx = contas.findIndex(c => c.id === Number(id));
    if (idx !== -1) {
        contas.splice(idx, 1);
        return true;
    }
    return false;
}
/** deposits an amount into the account */
function depositAmount(id, valor){
    const conta = findContaByIndex(id);
    if (conta && typeof valor === 'number' && valor > 0) {
        conta.saldo += valor;
        return true;
    }
    return false;
}

module.exports = {
    createConta,
    getAllContas,
    updateConta,
    deleteConta,
    depositAmount
};