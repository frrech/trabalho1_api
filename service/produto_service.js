const produtoRepository = require('../repository/produto_repository');
const categoriaRepository = require('../repository/categoria_repository');
const fornecedorRepository = require('../repository/fornecedor_repository');

async function createProduto(nome, categoriaId, fornecedorNome, preco) {
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

    const cid = parseInt(categoriaId, 10);
    if (isNaN(cid) || cid <= 0) {
        const error = new Error("categoriaId inválido.");
        error.id = 400;
        throw error;
    }

    const categoria = await categoriaRepository.getCategoriaById(cid);
    if (!categoria) {
        const error = new Error("Categoria não encontrada.");
        error.id = 404;
        throw error;
    }

    // get fornecedores and normalize to array
    const fornecedoresRaw = await fornecedorRepository.getAllFornecedores();
    const fornecedores = Array.isArray(fornecedoresRaw)
        ? fornecedoresRaw
        : (fornecedoresRaw && Array.isArray(fornecedoresRaw.rows) ? fornecedoresRaw.rows : []);

    if (!Array.isArray(fornecedores)) {
        const error = new Error("Erro ao obter fornecedores.");
        error.id = 500;
        throw error;
    }

    const fornecedorExiste = fornecedores.some(f => f && f.nome === fornecedorNome);
    if (!fornecedorExiste) {
        const error = new Error("Fornecedor não encontrado (pelo nome).");
        error.id = 404;
        throw error;
    }

    return await produtoRepository.createProduto(nome, cid, fornecedorNome, preco);
}

async function getAllProdutos() {
    return await produtoRepository.getAllProdutos();
}

async function getProdutoById(id) {
    const p = await produtoRepository.getProdutoById(id);
    if (!p) {
        const error = new Error("Produto não encontrado.");
        error.id = 404;
        throw error;
    }
    return p;
}

async function updateProduto(id, nome, categoriaId, fornecedorNome, preco) {
    const updated = await produtoRepository.updateProduto(id, nome, categoriaId, fornecedorNome, preco);
    if (!updated) {
        const error = new Error("Produto não encontrado.");
        error.id = 404;
        throw error;
    }
    return updated;
}

async function deleteProduto(id) {
    const removed = await produtoRepository.deleteProduto(id);
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
