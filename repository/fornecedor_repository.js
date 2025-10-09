/* Cadastro de fornecedor: anota-se apenas o CNPJ, nome e telefone. */
class Fornecedor{
    constructor(id, cnpj, nome, telefone){
        this.id = id;
        this.cnpj = cnpj;
        this.nome = nome;
        this.telefone = telefone;
    }
}

let fornecedores = [];
let autoIncrementId = 1;

function addFornecedor(cnpj, nome, telefone){
    const fornecedor = new Fornecedor(autoIncrementId++, cnpj, nome, telefone);
    fornecedores.push(fornecedor);
    return fornecedor;
}

function getFornecedorById(id){
    return fornecedores.find(fornecedor => fornecedor.id === id);
}

function getAllFornecedores(){
    return fornecedores;
}

function updateFornecedor(id, cnpj, nome, telefone){
    const fornecedor = getFornecedorById(id);
    if(fornecedor){
        fornecedor.cnpj = cnpj;
        fornecedor.nome = nome;
        fornecedor.telefone = telefone;
        return fornecedor;
    }
    return null;
}

function deleteFornecedor(id){
    const index = fornecedores.findIndex(fornecedor => fornecedor.id === id);
    if(index !== -1){
        return fornecedores.splice(index, 1)[0];
    }
    return null;
}

module.exports = {
    addFornecedor,
    getFornecedorById,
    getAllFornecedores,
    updateFornecedor,
    deleteFornecedor
}