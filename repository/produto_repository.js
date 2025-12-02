const db = require('../db.js');


class Produto {
    constructor(id, nome, categoriaId, fornecedorNome, preco) {
        this.id = id;
        this.nome = nome;
        this.categoriaId = categoriaId;
        this.fornecedorNome = fornecedorNome;
        this.preco = preco;
    }
}

async function createProduto(nome, categoriaId, fornecedorNome, preco) {
    const sql = `INSERT INTO produtos (nome, categoria_id, fornecedor_nome, preco)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id_produto, nome, categoria_id AS "categoriaId", fornecedor_nome AS "fornecedorNome", preco`;
    const values = [nome, parseInt(categoriaId), fornecedorNome, parseFloat(preco)];
    const client = await db.connect();
    try {
        const res = await client.query(sql, values);
        const r = res.rows[0];
        return new Produto(r.id, r.nome, r.categoriaId, r.fornecedorNome, parseFloat(r.preco));
    } finally {
        client.release();
    }
}

async function getAllProdutos() {
    const sql = `SELECT id_produto, nome, categoria_id AS "categoriaId", fornecedor_nome AS "fornecedorNome", preco FROM produtos ORDER BY id_produto`;
    const client = await db.connect();
    try {
        const res = await client.query(sql);
        return res.rows.map(r => new Produto(r.id, r.nome, r.categoriaId, r.fornecedorNome, parseFloat(r.preco)));
    } finally {
        client.release();
    }
}

async function getProdutoById(id) {
    const sql = `SELECT id_produto, nome, categoria_id AS "categoriaId", fornecedor_nome AS "fornecedorNome", preco FROM produtos WHERE id_produto = $1`;
    const client = await db.connect();
    try {
        const res = await client.query(sql, [parseInt(id)]);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Produto(r.id, r.nome, r.categoriaId, r.fornecedorNome, parseFloat(r.preco));
    } finally {
        client.release();
    }
}

async function updateProduto(id, nome, categoriaId, fornecedorNome, preco) {
    const sql = `UPDATE produtos
                 SET nome = $2, categoria_id = $3, fornecedor_nome = $4, preco = $5
                 WHERE id_produto = $1
                 RETURNING id_produto, nome, categoria_id AS "categoriaId", fornecedor_nome AS "fornecedorNome", preco`;
    const values = [parseInt(id), nome, parseInt(categoriaId), fornecedorNome, parseFloat(preco)];
    const client = await db.connect();
    try {
        const res = await client.query(sql, values);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Produto(r.id, r.nome, r.categoriaId, r.fornecedorNome, parseFloat(r.preco));
    } finally {
        client.release();
    }
}

async function deleteProduto(id) {
    const sql = `DELETE FROM produtos WHERE id_produto = $1 RETURNING id_produto, nome, categoria_id AS "categoriaId", fornecedor_nome AS "fornecedorNome", preco`;
    const client = await db.connect();
    try {
        const res = await client.query(sql, [parseInt(id)]);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Produto(r.id, r.nome, r.categoriaId, r.fornecedorNome, parseFloat(r.preco));
    } finally {
        client.release();
    }
}

module.exports = {
    createProduto,
    getAllProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
};
