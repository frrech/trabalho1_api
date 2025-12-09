const vendaRepository = require('../repository/venda_repository');
const produtoRepository = require('../repository/produto_repository');

function createVenda(clienteNome, itens) {
    // validações
    if (!clienteNome || clienteNome.trim() === '') {
        const error = new Error("Nome do cliente é obrigatório.");
        error.id = 400;
        throw error;
    }
    if (!Array.isArray(itens) || itens.length === 0) {
        const error = new Error("A venda deve ter ao menos um item.");
        error.id = 400;
        throw error;
    }

    // para cada item validar produto e quantidade
    let total = 0;
    const itensComPreco = itens.map(item => {
        const produto = produtoRepository.getProdutoById(item.produtoId);
        if (!produto) {
            const error = new Error(`Produto com id ${item.produtoId} não encontrado.`);
            error.id = 404;
            throw error;
        }
        const quantidade = parseInt(item.quantidade);
        if (isNaN(quantidade) || quantidade <= 0) {
            const error = new Error(`Quantidade inválida para o produto ${item.produtoId}.`);
            error.id = 400;
            throw error;
        }
        const precoUnitario = parseFloat(produto.preco);
        const subtotal = precoUnitario * quantidade;
        total += subtotal;
        return {
            produtoId: produto.id,
            nomeProduto: produto.nome,
            quantidade,
            precoUnitario,
            subtotal
        };
    });

    const dataHora = new Date().toISOString();
    return vendaRepository.createVenda(clienteNome, itensComPreco, dataHora, total);
}

function getAllVendas() {
    return vendaRepository.getAllVendas();
}

function getVendaById(id) {
    const v = vendaRepository.getVendaById(id);
    if (!v) {
        const error = new Error("Venda não encontrada.");
        error.id = 404;
        throw error;
    }
    return v;
}

function deleteVenda(id) {
    const removed = vendaRepository.deleteVenda(id);
    if (!removed) {
        const error = new Error("Venda não encontrada.");
        error.id = 404;
        throw error;
    }
    return removed;
}

module.exports = {
    createVenda,
    getAllVendas,
    getVendaById,
    deleteVenda
};
