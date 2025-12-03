const db = require('../db.js');

// Support both CommonJS and ESM-style export from db.js
const pool = db.pool || db;

async function createCliente(cliente) {
    const query = 'INSERT INTO cliente (nome, email, matricula) VALUES ($1, $2, $3) RETURNING id AS id, nome, email, matricula';
    const values = [cliente.nome, cliente.email, cliente.matricula];
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating cliente:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
}

async function getAllClientes() {
    const query = 'SELECT id AS id, nome, email, matricula FROM cliente ORDER BY id';
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching clientes:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
}

async function getClienteById(id) {
    const query = 'SELECT id AS id, nome, email, matricula FROM cliente WHERE id = $1';
    const values = [parseInt(id, 10)];
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error fetching cliente by id:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
}

async function updateCliente(id, cliente) {
    const query = 'UPDATE cliente SET nome = $1, email = $2, matricula = $3 WHERE id = $4 RETURNING id';
    const values = [cliente.nome, cliente.email, cliente.matricula, parseInt(id, 10)];
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error updating cliente:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
}

async function deleteCliente(id) {
    const query = 'DELETE FROM cliente WHERE id = $1';
    const values = [parseInt(id, 10)];
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error deleting cliente:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
}

module.exports = {
    createCliente,
    getAllClientes,
    getClienteById,
    updateCliente,
    deleteCliente
};