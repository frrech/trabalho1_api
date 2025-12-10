const categoriaRepository = require('../repository/categoria_repository');

async function createCategoria(nome, descricao) {
    if (!nome || nome.trim() === '') {
        const error = new Error("Nome da categoria é obrigatório.");
        error.id = 400;
        throw error;
    }
    return await categoriaRepository.createCategoria(nome, descricao || '');
}

async function getAllCategorias() {
    return await categoriaRepository.getAllCategorias();
}

async function getCategoriaById(id) {
    const cat = await categoriaRepository.getCategoriaById(id);
    if (!cat) {
        const error = new Error("Categoria não encontrada.");
        error.id = 404;
        throw error;
    }
    return cat;
}

async function updateCategoria(id, nome, descricao) {
    const updated = await categoriaRepository.updateCategoria(id, nome, descricao || '');
    if (!updated) {
        const error = new Error("Categoria não encontrada.");
        error.id = 404;
        throw error;
    }
    return updated;
}

async function deleteCategoria(id) {
    const removed = await categoriaRepository.deleteCategoria(id);
    if (!removed) {
        const error = new Error("Categoria não encontrada.");
        error.id = 404;
        throw error;
    }
    return removed;
}

module.exports = {
    createCategoria,
    getAllCategorias,
    getCategoriaById,
    updateCategoria,
    deleteCategoria
};
