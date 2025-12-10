const vendaRepository = require('../repository/venda_repository');
const usuarioRepository = require('../repository/usuario_repository');
const produtoRepository = require('../repository/produto_repository');

async function createVenda(payload) {
    // payload may contain usuarioNome OR usuario_id, itens, dataHora, total
    let usuarioNome = payload.usuarioNome || payload.usuario_name || null;

    if (!usuarioNome && payload.usuario_id) {
        const usuario = await usuarioRepository.getUsuarioById(payload.usuario_id);
        if (!usuario) {
            throw { id: 400, message: 'usuario não encontrado para o usuario_id fornecido.' };
        }
        usuarioNome = usuario.nome || usuario.nome_completo || null;
    }

    if (!usuarioNome || usuarioNome.trim() === '') {
        const error = new Error("Nome do usuario é obrigatório.");
        error.id = 400;
        throw error;
    }

    const itens = Array.isArray(payload.itens) ? payload.itens : [];
    if (itens.length === 0) {
        const error = new Error("A venda deve ter ao menos um item.");
        error.id = 400;
        throw error;
    }

    // validate each item (async if produtoRepository.getProdutoById is async)
    let total = 0;
    const itensComPreco = await Promise.all(itens.map(async item => {
        if (!item || !item.produtoId) {
            const error = new Error('Item inválido.');
            error.id = 400;
            throw error;
        }

        const produto = await produtoRepository.getProdutoById(item.produtoId);
        if (!produto) {
            const error = new Error(`Produto com id ${item.produtoId} não encontrado.`);
            error.id = 404;
            throw error;
        }

        const quantidade = parseInt(item.quantidade, 10);
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
    }));

    const dataHora = payload.dataHora ? new Date(payload.dataHora).toISOString() : new Date().toISOString();

    // ensure total from calculation or payload (prefer calculated)
    const finalTotal = (!isNaN(total) && total > 0) ? total : parseFloat(payload.total || 0);

    const created = await vendaRepository.createVenda(usuarioNome, itensComPreco, dataHora, finalTotal);
    return created;
}

async function getAllVendas() {
    return await vendaRepository.getAllVendas();
}

async function getVendaById(id) {
    const v = await vendaRepository.getVendaById(id);
    if (!v) {
        const error = new Error("Venda não encontrada.");
        error.id = 404;
        throw error;
    }
    return v;
}

async function deleteVenda(id) {
    const removed = await vendaRepository.deleteVenda(id);
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
