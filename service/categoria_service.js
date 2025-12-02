const categoriaRepository = require('../repository/categoria_repository');

function createCategoria(nome, descricao) {
    if (!nome || nome.trim() === '') {
        const error = new Error("Nome da categoria é obrigatório.");
        error.id = 400;
        throw error;
    }
    return categoriaRepository.addCategoria(nome, descricao || '');
}

function getAllCategorias() {
    return categoriaRepository.getAllCategorias();
}

function getCategoriaById(id) {
    const cat = categoriaRepository.getCategoriaById(id);
    if (!cat) {
        const error = new Error("Categoria não encontrada.");
        error.id = 404;
        throw error;
    }
    return cat;
}

function updateCategoria(id, nome, descricao) {
    const updated = categoriaRepository.updateCategoria(id, nome, descricao || '');
    if (!updated) {
        const error = new Error("Categoria não encontrada.");
        error.id = 404;
        throw error;
    }
    return updated;
}

function deleteCategoria(id) {
    const removed = categoriaRepository.deleteCategoria(id);
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
