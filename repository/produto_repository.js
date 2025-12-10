const pool = require('../db.js')


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
                 RETURNING id_produto AS id, nome, categoria_id AS "categoriaId", fornecedor_nome AS "fornecedorNome", preco`;
    const values = [nome, parseInt(categoriaId, 10), fornecedorNome, parseFloat(preco)];
    let client = null;;
    try {
        client = await pool.connect();
        const res = await client.query(sql, values);
        const r = res.rows[0];
        return new Produto(r.id, r.nome, r.categoriaId, r.fornecedorNome, parseFloat(r.preco));
    } finally {
        if (client) client.release();
    }
}

async function getAllProdutos() {
    const sql = `SELECT id_produto AS id, nome, categoria_id AS "categoriaId", fornecedor_nome AS "fornecedorNome", preco FROM produtos ORDER BY id_produto`;
    let client = null;;
    try {
        client = await pool.connect();
        const res = await client.query(sql);
        return res.rows.map(r => new Produto(r.id, r.nome, r.categoriaId, r.fornecedorNome, parseFloat(r.preco)));
    } finally {
        if (client) client.release();
    }
}

async function getProdutoById(id) {
    const sql = `SELECT id_produto AS id, nome, categoria_id AS "categoriaId", fornecedor_nome AS "fornecedorNome", preco FROM produtos WHERE id_produto = $1`;
    let client = null;
    try {
        client = await pool.connect();
        const res = await client.query(sql, [parseInt(id, 10)]);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Produto(r.id, r.nome, r.categoriaId, r.fornecedorNome, parseFloat(r.preco));
    } finally {
        if (client) client.release();
    }
}

async function updateProduto(id, nome, categoriaId, fornecedorNome, preco) {
    const sql = `UPDATE produtos
                 SET nome = $2, categoria_id = $3, fornecedor_nome = $4, preco = $5
                 WHERE id_produto = $1
                 RETURNING id_produto AS id, nome, categoria_id AS "categoriaId", fornecedor_nome AS "fornecedorNome", preco`;
    const values = [parseInt(id, 10), nome, parseInt(categoriaId, 10), fornecedorNome, parseFloat(preco)];
    let client = null;;
    try {
        client = await pool.connect();
        const res = await client.query(sql, values);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Produto(r.id, r.nome, r.categoriaId, r.fornecedorNome, parseFloat(r.preco));
    } finally {
        if (client) client.release();
    }
}

async function deleteProduto(id) {
    const sql = `DELETE FROM produtos WHERE id_produto = $1 RETURNING id_produto AS id, nome, categoria_id AS "categoriaId", fornecedor_nome AS "fornecedorNome", preco`;
    let client = null;
    try {
        client = await pool.connect();
        const res = await client.query(sql, [parseInt(id, 10)]);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Produto(r.id, r.nome, r.categoriaId, r.fornecedorNome, parseFloat(r.preco));
    } finally {
        if (client) client.release();
    }
}

module.exports = {
    createProduto,
    getAllProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
};
