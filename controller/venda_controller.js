const vendaService = require('../service/venda_service');

async function createVenda(req, res) {
    try {
        const { clienteNome, itens } = req.body;
        const newVenda = vendaService.createVenda(clienteNome, itens);
        res.status(201).json(newVenda);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function getAllVendas(req, res) {
    try {
        const vendas = vendaService.getAllVendas();
        res.status(200).json(vendas);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function getVendaById(req, res) {
    try {
        const { id } = req.params;
        const venda = vendaService.getVendaById(id);
        res.status(200).json(venda);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function deleteVenda(req, res) {
    try {
        const { id } = req.params;
        vendaService.deleteVenda(id);
        res.status(204).send();
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

module.exports = {
    createVenda,
    getAllVendas,
    getVendaById,
    deleteVenda
};
