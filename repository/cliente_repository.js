class Cliente{
    constructor(id, nome, email, matricula){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.matricula = matricula;
    }
}
let autoIncrementId = 1;
const clientes = [];
function createCliente(nome, email, matricula){
    clientes.push(new Cliente(autoIncrementId++, nome, email, matricula));
}

function getAllClientes(){
    return clientes;
}

function getClienteById(id){
    return clientes.find(cliente => cliente.id === id);
}

function updateCliente(id, nome, email, matricula){
    const cliente = getClienteById(id);
    if(cliente){
        cliente.nome = nome;
        cliente.email = email;
        cliente.matricula = matricula;
        return true;
    }
    return false;
}

function deleteCliente(id){
    const index = clientes.findIndex(cliente => cliente.id === id);
    if(index !== -1){
        clientes.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    createCliente,
    getAllClientes,
    getClienteById,
    updateCliente,
    deleteCliente
};