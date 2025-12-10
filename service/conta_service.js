const contaRepository = require('../repository/conta_repository');

function isValidClienteObject(cliente) {
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
    if (!isValidSaldo(saldo)) {
        throw { id: 401, message: "Saldo inválido." };
    }

    let cliente_id = null;
    if (typeof cliente === 'number' && cliente > 0) {
        cliente_id = cliente;
    } else if (cliente && typeof cliente.cliente_id === 'number' && cliente.cliente_id > 0) {
        cliente_id = cliente.cliente_id;
    } else {
        if (isValidClienteObject(cliente)) {
            throw { id: 401, message: "Envie cliente_id (número) para criar a conta ou adapte o serviço para criar o cliente primeiro." };
        }
        throw { id: 401, message: "Campos de cliente e saldo devem ser preenchidos propriamente." };
    }

    const created = await contaRepository.createConta(cliente_id, saldo);
    return created;
}

async function getAllContas(){
    const c = await contaRepository.getAllContas();
    if (c == null) {
        throw {id: 404, message: "Contas não encontradas."};
    }
    return c;
}

async function updateConta(id, conta){
    if(!id || id <= 0){
        throw { id: 401, message: "ID inválido." }
    }

    // accept either { cliente_id: number, saldo } or { cliente: { cliente_id: number }, saldo }
    const cliente_id = (conta && typeof conta.cliente_id === 'number' && conta.cliente_id > 0)
        ? conta.cliente_id
        : (conta && conta.cliente && typeof conta.cliente.cliente_id === 'number' && conta.cliente.cliente_id > 0)
            ? conta.cliente.cliente_id
            : null;

    if (cliente_id === null || !isValidSaldo(conta && conta.saldo)) {
        throw { id: 401, message: "Campos de cliente_id (número) e saldo devem ser preenchidos propriamente." };
    }

    const updated = await contaRepository.updateConta(id, { cliente_id, saldo: conta.saldo });
    if (!updated) {
        throw { id: 404, message: "Conta não encontrada." };
    }
    return updated;
}

async function deleteConta(id){
    if(!id || id <= 0){
        throw { id: 401, message: "ID inválido." }
    }
    const deleted = await contaRepository.deleteConta(id);
    if(!deleted){
        throw {id: 404, message: "Conta não encontrada."}
    }
    return deleted;
}

async function depositAmount(id, valor){
    if(!id || id <= 0){
        throw { id: 401, message: "ID inválido." }
    }
    if(typeof valor !== 'number' || valor <= 0){
        throw { id: 401, message: "Valor inválido." }
    }
    const deposited = await contaRepository.depositAmount(id, valor);
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