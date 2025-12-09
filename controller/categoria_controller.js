const categoriaService = require('../service/categoria_service');

async function createCategoria(req, res) {
    try {
        const { nome, descricao } = req.body;
        const newCategoria = categoriaService.createCategoria(nome, descricao);
        res.status(201).json(newCategoria);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function getAllCategorias(req, res) {
    try {
        const categorias = categoriaService.getAllCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function getCategoriaById(req, res) {
    try {
        const { id } = req.params;
        const categoria = categoriaService.getCategoriaById(id);
        res.status(200).json(categoria);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function updateCategoria(req, res) {
    try {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        const updated = categoriaService.updateCategoria(id, nome, descricao);
        res.status(200).json(updated);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function deleteCategoria(req, res) {
    try {
        const { id } = req.params;
        categoriaService.deleteCategoria(id);
        res.status(204).send();
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

module.exports = {
    createCategoria,
    getAllCategorias,
    getCategoriaById,
    updateCategoria,
    deleteCategoria
};