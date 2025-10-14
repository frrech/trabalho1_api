const fornecedorRepository = require('../repository/fornecedor_repository');

function createFornecedor(cnpj, nome, telefone){
    if(!cnpj || !nome || !telefone){
        throw {id: 400, message: "CNPJ, nome e telefone são obrigatórios."}
    }
    return fornecedorRepository.addFornecedor(cnpj, nome, telefone);
}

function getAllFornecedores(){
    if(fornecedorRepository.getAllFornecedores().length === 0){
        throw {id: 404, message: "Nenhum fornecedor encontrado."}
    }
    return fornecedorRepository.getAllFornecedores();
}

function getFornecedorById(id){
    const fornecedor = fornecedorRepository.getFornecedorById(id);
    if(!fornecedor){
        throw {id: 404, message: "Fornecedor não encontrado."}
    }
    return fornecedor;
}

function updateFornecedor(id, cnpj, nome, telefone){
    if(!cnpj || !nome || !telefone){
        throw {id: 400, message: "CNPJ, nome e telefone são obrigatórios."}
    }
    const updated = fornecedorRepository.updateFornecedor(id, cnpj, nome, telefone);
    if(!updated){
        throw {id: 404, message: "Fornecedor não encontrado."}
    }
    return updated;
}

function deleteFornecedor(id){
    const deleted = fornecedorRepository.deleteFornecedor(id);
    if(!deleted){
        throw new {id: 404, message: "Fornecedor não encontrado."}
    }
    return deleted;
}

module.exports = {
    createFornecedor,
    getAllFornecedores,
    getFornecedorById,
    updateFornecedor,
    deleteFornecedor
};