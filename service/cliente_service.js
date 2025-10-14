const clienteRepository = require('../repository/cliente_repository');

function createCliente(cliente){
    if(!cliente || !cliente.nome || !cliente.email || !cliente.matricula){
        throw {id: 400, message: "Nome, email e matrícula são obrigatórios."};
    }
    return clienteRepository.createCliente(nome, email, matricula);
}

function getAllClientes(){
    if(clienteRepository.getAllClientes().length === 0){
        throw {id: 404, message: "Nenhum cliente encontrado."};
    }
    return clienteRepository.getAllClientes();
}

function getClienteById(id){
    const cliente = clienteRepository.getClienteById(id);
    if(!cliente){
        throw {id: 404, message: "Cliente não encontrado."};
    }
    return cliente;
}

function updateCliente(cliente){
    if(!cliente || !cliente.id || !cliente.nome || !cliente.email || !cliente.matricula){
        throw {id: 400, message: "Nome, email e matrícula são obrigatórios."};
    }
    const updated = clienteRepository.updateCliente(id, nome, email, matricula);
    if(!updated){
        throw {id: 404, message: "Cliente não encontrado."}
    }
    return updated;
}

function deleteCliente(id){
    const deleted = clienteRepository.deleteCliente(id);
    if(!deleted){
        throw {id: 404, message: "Cliente não encontrado."}
    }
    return deleted;
}

module.exports = {
    createCliente,
    getAllClientes,
    getClienteById,
    updateCliente,
    deleteCliente
};