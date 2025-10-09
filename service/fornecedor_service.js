const fornecedorRepository = require('../repository/fornecedor_repository');

function createFornecedor(cnpj, nome, telefone){
    if(!cnpj || !nome || !telefone){
        throw new Error("CNPJ, nome e telefone são obrigatórios.");
    }
    return fornecedorRepository.addFornecedor(cnpj, nome, telefone);
}

function getAllFornecedores(){
    if(fornecedorRepository.getAllFornecedores().length === 0){
        throw new Error("Nenhum fornecedor cadastrado.");
    }
    return fornecedorRepository.getAllFornecedores();
}

function getFornecedorById(id){
    const fornecedor = fornecedorRepository.getFornecedorById(id);
    if(!fornecedor){
        throw new Error("Fornecedor não encontrado.");
    }
    return fornecedor;
}

function updateFornecedor(id, cnpj, nome, telefone){
    if(!cnpj || !nome || !telefone){
        throw new Error("CNPJ, nome e telefone são obrigatórios.");
    }
    const updated = fornecedorRepository.updateFornecedor(id, cnpj, nome, telefone);
    if(!updated){
        throw new Error("Fornecedor não encontrado.");
    }
    return updated;
}

function deleteFornecedor(id){
    const deleted = fornecedorRepository.deleteFornecedor(id);
    if(!deleted){
        throw new Error("Fornecedor não encontrado.");
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