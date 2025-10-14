const clienteRepository = require('./cliente_repository')
class Conta{
    constructor(id, cliente, saldo){
        id = this.id;
        cliente = this.cliente;
        saldo = this.saldo;
    }
}
let autoIncrementId = 1;
let contas = [];

function createConta(cliente, saldo){
    const newCliente = clienteRepository.createCliente(cliente);
    contas.push(Conta(autoIncrementId++, newCliente, saldo));
}

function findContaByIndex(id){
    return contas.find(conta => conta.id === id);
}

function updateConta(id, conta){
    const c = findContaByIndex(id);
    if(c){
        c = conta;
        return true;
    }
    return false;
}

function deleteConta(id){
    const target = contas.findIndex(id);
    if(contas[target]){
        contas.splice(target, 1);
        return true;
    }
    return false;
}
/** deposits an amount into the account */
function depositAmount(id, valor){
    const conta = findContaByIndex(id);
    if(conta){
        saldo += valor;
        return true;
    }
    return false;
}

modules.exports = {
    createConta,
    findContaByIndex,
    updateConta,
    deleteConta,
    depositAmount
};