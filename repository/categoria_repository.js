const db = require('../db.js');


class Categoria {
    constructor(id, nome, descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }
}

async function addCategoria(nome, descricao) {
    const sql = `INSERT INTO categorias (nome, descricao)
                 VALUES ($1, $2)
                 RETURNING id_categoria, nome, descricao`;
    const values = [nome, descricao];
    const client = await db.connect();
    try {
        const res = await client.query(sql, values);
        const row = res.rows[0];
        return new Categoria(row.id, row.nome, row.descricao);
    } finally {
        client.release();
    }
}

async function getAllCategorias() {
    const sql = `SELECT id_categoria, nome, descricao FROM categorias ORDER BY id_categoria`;
    const client = await db.connect();
    try {
        const res = await client.query(sql);
        return res.rows.map(r => new Categoria(r.id, r.nome, r.descricao));
    } finally {
        client.release();
    }
}

async function getCategoriaById(id) {
    const sql = `SELECT id_categoria, nome, descricao FROM categorias WHERE id_categoria = $1`;
    const client = await db.connect();
    try {
        const res = await client.query(sql, [parseInt(id)]);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Categoria(r.id, r.nome, r.descricao);
    } finally {
        client.release();
    }
}

async function updateCategoria(id, nome, descricao) {
    const sql = `UPDATE categorias
                 SET nome = $2, descricao = $3
                 WHERE id_categoria = $1
                 RETURNING id_categoria, nome, descricao`;
    const values = [parseInt(id), nome, descricao];
    const client = await db.connect();
    try {
        const res = await client.query(sql, values);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Categoria(r.id, r.nome, r.descricao);
    } finally {
        client.release();
    }
}

async function deleteCategoria(id) {
    const sql = `DELETE FROM categorias WHERE id_categoria = $1 RETURNING id_categoria, nome, descricao`;
    const client = await db.connect();
    try {
        const res = await client.query(sql, [parseInt(id)]);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Categoria(r.id, r.nome, r.descricao);
    } finally {
        client.release();
    }
}

module.exports = {
    addCategoria,
    getAllCategorias,
    getCategoriaById,
    updateCategoria,
    deleteCategoria
};