const fornecedor_service = require('../service/fornecedor_service');

function createFornecedor(req, res) {
    try {
        const { cnpj, nome, telefone } = req.body;
        const newFornecedor = fornecedor_service.createFornecedor(cnpj, nome, telefone);
        res.status(201).json(newFornecedor);
    } catch (error) {
        res.status(error.id).json({ error: error.message });
    }
}

 function getAllFornecedores(req, res) {
    try {
        const fornecedores = fornecedor_service.getAllFornecedores();
        res.status(200).json(fornecedores);
    } catch (error) {
        res.status(error.id).json({ error: error.message });
    }
}

function getFornecedorById(req, res) {
    try {
        const { id } = req.params;
        const fornecedor = fornecedor_service.getFornecedorById(id);
        res.status(200).json(fornecedor);
    } catch (error) {
        res.status(error.id).json({ error: error.message });
    }
}

 function updateFornecedor(req, res) {
    try {
        const { id } = req.params;
        const { cnpj, nome, telefone } = req.body;
        const updatedFornecedor = fornecedor_service.updateFornecedor(id, cnpj, nome, telefone);
        res.status(200).json(updatedFornecedor);
    } catch (error) {
        res.status(error.id).json({ error: error.message });
    }
}

function deleteFornecedor(req, res) {
    try {
        const { id } = req.params;
        fornecedor_service.deleteFornecedor(id);
        res.status(204).send();
    } catch (error) {
        res.status(error.id).json({ error: error.message });
    }
}

module.exports = {
    createFornecedor,
    getAllFornecedores,
    getFornecedorById,
    updateFornecedor,
    deleteFornecedor
};