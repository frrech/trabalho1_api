const pool = require('../db.js')
class Venda {
    constructor(id, clienteNome, itens, dataHora, total) {
        this.id = id;
        this.clienteNome = clienteNome;
        this.itens = itens;
        this.dataHora = dataHora;
        this.total = total;
    }
}

async function createVenda(clienteNome, itens, dataHora, total) {
    const sql = `INSERT INTO vendas (cliente_nome, itens, data_hora, total)
                 VALUES ($1, $2::jsonb, $3::timestamp, $4)
                 RETURNING id_venda AS id, cliente_nome AS "clienteNome", itens, data_hora AS "dataHora", total`;
    const values = [
        clienteNome,
        JSON.stringify(itens),
        dataHora,
        parseFloat(total)
    ];
    let client = null;
    try {
        client = await pool.connect();
        const res = await client.query(sql, values);
        const r = res.rows[0];
        const parsedItens = r.itens ? JSON.parse(r.itens) : [];
        return new Venda(r.id, r.clienteNome, parsedItens, r.dataHora, parseFloat(r.total));
    } finally {
        if (client) client.release();
    }
}

async function getAllVendas() {
    const sql = `SELECT id_venda AS id, cliente_nome AS "clienteNome", itens, data_hora AS "dataHora", total FROM vendas ORDER BY id_venda`;
    let client = null;
    try {
        client = await pool.connect();
        const res = await client.query(sql);
         const parsedItens = r.itens ? JSON.parse(r.itens) : [];
        return res.rows.map(r => new Venda(r.id, r.clienteNome, parsedItens, r.dataHora, parseFloat(r.total)));
    } finally {
        if (client) client.release();
    }
}

async function getVendaById(id) {
    const sql = `SELECT id_venda AS id, cliente_nome AS "clienteNome", itens, data_hora AS "dataHora", total FROM vendas WHERE id_venda = $1`;
    let client = null;
    try {
        client = await pool.connect();
        const res = await client.query(sql, [parseInt(id, 10)]);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        const parsedItens = r.itens ? JSON.parse(r.itens) : [];
        return new Venda(r.id, r.clienteNome, parsedItens, r.dataHora, parseFloat(r.total));
    } finally {
        if (client) client.release();
    }
}

async function deleteVenda(id) {
    const sql = `DELETE FROM vendas WHERE id_venda = $1 RETURNING id_venda AS id, cliente_nome AS "clienteNome", itens, data_hora AS "dataHora", total`;
    let client = null;
    try {
        client = await pool.connect();
        const res = await client.query(sql, [parseInt(id, 10)]);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Venda(r.id, r.clienteNome, r.itens, r.dataHora, parseFloat(r.total));
    } finally {
        if (client) client.release();
    }
}

module.exports = {
    createVenda,
    getAllVendas,
    getVendaById,
    deleteVenda
};
