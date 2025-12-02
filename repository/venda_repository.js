const db = require('../db.js');

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
                 VALUES ($1, $2::jsonb, $3::timestamptz, $4)
                 RETURNING id_venda, cliente_nome AS "clienteNome", itens, data_hora AS "dataHora", total`;
    const values = [
        clienteNome,
        JSON.stringify(itens),
        dataHora ? new Date(dataHora) : new Date(),
        parseFloat(total)
    ];
    const client = await db.connect();
    try {
        const res = await client.query(sql, values);
        const r = res.rows[0];
        return new Venda(r.id, r.clienteNome, r.itens, r.dataHora, parseFloat(r.total));
    } finally {
        client.release();
    }
}

async function getAllVendas() {
    const sql = `SELECT id_venda, cliente_nome AS "clienteNome", itens, data_hora AS "dataHora", total FROM vendas ORDER BY id_venda`;
    const client = await db.connect();
    try {
        const res = await client.query(sql);
        return res.rows.map(r => new Venda(r.id, r.clienteNome, r.itens, r.dataHora, parseFloat(r.total)));
    } finally {
        client.release();
    }
}

async function getVendaById(id) {
    const sql = `SELECT id_venda, cliente_nome AS "clienteNome", itens, data_hora AS "dataHora", total FROM vendas WHERE id_venda = $1`;
    const client = await db.connect();
    try {
        const res = await client.query(sql, [parseInt(id)]);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Venda(r.id, r.clienteNome, r.itens, r.dataHora, parseFloat(r.total));
    } finally {
        client.release();
    }
}

async function deleteVenda(id) {
    const sql = `DELETE FROM vendas WHERE id_venda = $1 RETURNING id_venda, cliente_nome AS "clienteNome", itens, data_hora AS "dataHora", total`;
    const client = await db.connect();
    try {
        const res = await client.query(sql, [parseInt(id)]);
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Venda(r.id, r.clienteNome, r.itens, r.dataHora, parseFloat(r.total));
    } finally {
        client.release();
    }
}

module.exports = {
    createVenda,
    getAllVendas,
    getVendaById,
    deleteVenda
};
