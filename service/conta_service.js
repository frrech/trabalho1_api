const contaRepository = require('../repository/conta_repository');

function isValidCliente(cliente) {
    return cliente &&
        typeof cliente.nome === 'string' && cliente.nome.trim() !== '' &&
        typeof cliente.email === 'string' && cliente.email.trim() !== '' &&
        typeof cliente.matricula === 'string' && cliente.matricula.trim() !== '';
}

function isValidSaldo(saldo) {
    return saldo != null &&
        typeof saldo === 'number' &&
        !isNaN(saldo) &&
        saldo >= 0;
}

async function createConta(cliente, saldo){
    if (!isValidCliente(cliente) || !isValidSaldo(saldo)) {
        throw { id: 401, message: "Campos de cliente e saldo devem ser preenchidos propriamente." };
    }
    await contaRepository.createConta(cliente, saldo);
}


function getAllContas(){
    const c = contaRepository.getAllContas();
    if(!c){
        throw {id: 404, message: "Conta não encontrada."}
    }
    return c;
}

function updateConta(id, conta){
    if(!id || id <= 0){
        throw { id: 401, message: "ID inválido." }
    }
    if (
        !conta ||
        !isValidCliente(conta.cliente) ||
        !isValidSaldo(conta.saldo)
    ) {
        throw { id: 401, message: "Campos de cliente e saldo devem ser preenchidos propriamente." };
    }
    if (updated === null || updated === undefined) {
        throw { id: 404, message: "Conta não encontrada." };
    }
    return contaRepository.updateConta(id, conta);
}
function deleteConta(id){
    if(!id || id <= 0){
        throw { id: 401, message: "ID inválido." }
    }
    const deleted = contaRepository.deleteConta(id);
    if(!deleted){
        throw {id: 404, message: "Conta não encontrada."}
    }
    return deleted;
}

function depositAmount(id, valor){
    if(!id || id <= 0){
        throw { id: 401, message: "ID inválido." }
    }
    if(!valor || valor <= 0){
        throw { id: 401, message: "Valor inválido." }
    }
    const deposited = contaRepository.depositAmount(id, valor);
    if(!deposited){
        throw {id: 404, message: "Conta não encontrada."}
    }
    return deposited;
}
module.exports = {
    createConta,
    getAllContas,
    updateConta,
    deleteConta,
    depositAmount
};