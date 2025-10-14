const clienteRepository = require('../repository/cliente_repository');

function createCliente(cliente){
    if(!cliente || !cliente.nome || !cliente.email || !cliente.matricula){
        throw new Error("Nome, email e matrícula são obrigatórios.");
    }
    return clienteRepository.createCliente(nome, email, matricula);
}

function getAllClientes(){
    if(clienteRepository.getAllClientes().length === 0){
        throw new Error("Nenhum cliente cadastrado.");
    }
    return clienteRepository.getAllClientes();
}

function getClienteById(id){
    const cliente = clienteRepository.getClienteById(id);
    if(!cliente){
        throw new Error("Cliente não encontrado.");
    }
    return cliente;
}

function updateCliente(id, nome, email, matricula){
    if(!nome || !email || !matricula){
        throw new Error("Nome, email e matrícula são obrigatórios.");
    }
    const updated = clienteRepository.updateCliente(id, nome, email, matricula);
    if(!updated){
        throw new Error("Cliente não encontrado.");
    }
    return updated;
}

function deleteCliente(id){
    const deleted = clienteRepository.deleteCliente(id);
    if(!deleted){
        throw new Error("Cliente não encontrado.");
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