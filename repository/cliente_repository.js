const db = require('../db.js');

async function createCliente(cliente) {
    const query = 'INSERT INTO clientes (nome, email, matricula) VALUES ($1, $2, $3) RETURNING *';
    const values = [cliente.nome, cliente.email, cliente.matricula];
    
    try {
        const c = await db.connect();
        const result = await c.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating cliente:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function getAllClientes() {
    const query = 'SELECT * FROM clientes ORDER BY id';
    
    try {
        const c = await db.connect();
        const result = await c.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching clientes:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function getClienteById(id) {
    const query = 'SELECT * FROM clientes WHERE id = $1';
    const values = [id];
    
    try {
        const c = await db.connect();
        const result = await c.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching cliente by id:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function updateCliente(id, cliente) {
    const query = 'UPDATE clientes SET nome = $1, email = $2, matricula = $3 WHERE id = $4 RETURNING *';
    const values = [cliente.nome, cliente.email, cliente.matricula, id];
    
    try {
        const c = await db.connect();
        const result = await c.query(query, values);
        return result.rows[0] ? true : false;
    } catch (error) {
        console.error('Error updating cliente:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function deleteCliente(id) {
    const query = 'DELETE FROM clientes WHERE id = $1';
    const values = [id];
    
    try {
        const c = await db.connect();
        const result = await c.query(query, values);
        return result.rowCount > 0 ? true : false;
    } catch (error) {
        console.error('Error deleting cliente:', error);
        throw error;
    } finally {
        c.release();
    }
}

module.exports = {
    createCliente,
    getAllClientes,
    getClienteById,
    updateCliente,
    deleteCliente
};