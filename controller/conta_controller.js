const contaService = require('../service/conta_service');

async function createConta(req, res) {
    try {
        const cliente = req.body.cliente;
        const saldo = req.body.saldo;
        const newConta = await contaService.createConta(cliente, saldo);
        res.status(201).json(newConta);
    } catch (error) {
        res.status(error.id || 500).json({ message: error.message || "Erro interno do servidor." });
    }
}

async function getAllContas(req, res) {
    try {
        const conta = contaService.getAllContas();
        res.status(200).json(conta);
    } catch (error) {
        res.status(error.id || 500).json({ message: error.message || "Erro interno do servidor." });
    }
}

async function updateConta(req, res) {
    try {
        const {id} = req.params;
        const contaData = req.body;
        const updatedConta = contaService.updateConta(id, contaData);
        res.status(200).json(updatedConta);
    } catch (error) {
        res.status(error.id || 500).json({ message: error.message || "Erro interno do servidor." });
    }
}

async function deleteConta(req, res) {
    try {
        const id = parseInt(req.params.id);
        contaService.deleteConta(id);
        res.status(204).send();
    } catch (error) {
        res.status(error.id || 500).json({ message: error.message || "Erro interno do servidor." });
    }
}

async function depositAmount(req, res) {
    try {
        const id = parseInt(req.params.id);
        const valor = parseFloat(req.body.valor);
        const updatedConta = contaService.depositAmount(id, valor);
        res.status(200).json(updatedConta);
    } catch (error) {
        res.status(error.id || 500).json({ message: error.message || "Erro interno do servidor." });
    }
}

module.exports = {
    createConta,
    getAllContas,
    updateConta,
    deleteConta,
    depositAmount
};