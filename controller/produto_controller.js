const produtoService = require('../service/produto_service');

async function createProduto(req, res) {
    try {
        const { nome, categoriaId, fornecedorNome, preco } = req.body;
        const newProduto = produtoService.createProduto(nome, categoriaId, fornecedorNome, preco);
        res.status(201).json(newProduto);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function getAllProdutos(req, res) {
    try {
        const produtos = produtoService.getAllProdutos();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function getProdutoById(req, res) {
    try {
        const { id } = req.params;
        const produto = produtoService.getProdutoById(id);
        res.status(200).json(produto);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function updateProduto(req, res) {
    try {
        const { id } = req.params;
        const { nome, categoriaId, fornecedorNome, preco } = req.body;
        const updated = produtoService.updateProduto(id, nome, categoriaId, fornecedorNome, preco);
        res.status(200).json(updated);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function deleteProduto(req, res) {
    try {
        const { id } = req.params;
        produtoService.deleteProduto(id);
        res.status(204).send();
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

module.exports = {
    createProduto,
    getAllProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
};
