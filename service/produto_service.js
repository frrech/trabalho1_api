const produtoRepository = require('../repository/produto_repository');
const categoriaRepository = require('../repository/categoria_repository');

function createProduto(nome, categoriaId, fornecedorNome, preco) {
    if (!nome || nome.trim() === '') {
        const error = new Error("Nome do produto é obrigatório.");
        error.id = 400;
        throw error;
    }
    if (isNaN(preco) || parseFloat(preco) < 0) {
        const error = new Error("Preço inválido.");
        error.id = 400;
        throw error;
    }

    // valida categoria existente
    const categoria = categoriaRepository.getCategoriaById(categoriaId);
    if (!categoria) {
        const error = new Error("Categoria não encontrada.");
        error.id = 404;
        throw error;
    }

    // valida fornecedor existente pelo nome (se desejar exigir existência do fornecedor)
    // seu repositório de fornecedor tem getFornecedorById, getAllFornecedores e addFornecedor.
    // aqui aceitamos fornecedorNome como string — opcionalmente verificamos se existe um fornecedor com esse nome.
    const fornecedores = fornecedorRepository.getAllFornecedores();
    const fornecedorExiste = fornecedores.some(f => f.nome === fornecedorNome);
    if (!fornecedorExiste) {
        const error = new Error("Fornecedor não encontrado (pelo nome).");
        error.id = 404;
        throw error;
    }

    return produtoRepository.createProduto(nome, categoriaId, fornecedorNome, preco);
}

function getAllProdutos() {
    return produtoRepository.getAllProdutos();
}

function getProdutoById(id) {
    const p = produtoRepository.getProdutoById(id);
    if (!p) {
        const error = new Error("Produto não encontrado.");
        error.id = 404;
        throw error;
    }
    return p;
}

function updateProduto(id, nome, categoriaId, fornecedorNome, preco) {
    const updated = produtoRepository.updateProduto(id, nome, categoriaId, fornecedorNome, preco);
    if (!updated) {
        const error = new Error("Produto não encontrado.");
        error.id = 404;
        throw error;
    }
    return updated;
}

function deleteProduto(id) {
    const removed = produtoRepository.deleteProduto(id);
    if (!removed) {
        const error = new Error("Produto não encontrada.");
        error.id = 404;
        throw error;
    }
    return removed;
}

module.exports = {
    createProduto,
    getAllProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
};
