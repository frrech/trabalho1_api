/* Cadastro de fornecedor: anota-se apenas o CNPJ, nome e telefone. */
const { pool } = require('../db.js');

async function addFornecedor(cnpj, nome, telefone) {
    const query = 'INSERT INTO fornecedores (cnpj, nome, telefone) VALUES ($1, $2, $3) RETURNING *';
    const values = [cnpj, nome, telefone];
    
    try {
        const c = await pool.connect();
        const result = await c.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating fornecedor:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function getFornecedorById(id) {
    const query = 'SELECT * FROM fornecedores WHERE id = $1';
    const values = [id];
    
    try {
        const c = await pool.connect();
        const result = await c.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching fornecedor by id:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function getAllFornecedores() {
    const query = 'SELECT * FROM fornecedores ORDER BY id';
    
    try {
        const c = await pool.connect();
        const result = await c.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching fornecedores:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function updateFornecedor(id, cnpj, nome, telefone) {
    const query = 'UPDATE fornecedores SET cnpj = $1, nome = $2, telefone = $3 WHERE id = $4 RETURNING *';
    const values = [cnpj, nome, telefone, id];
    
    try {
        const c = await pool.connect();
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating fornecedor:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function deleteFornecedor(id) {
    const query = 'DELETE FROM fornecedores WHERE id = $1 RETURNING *';
    const values = [id];
    
    try {
        const c = await pool.connect();
        const result = await c.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting fornecedor:', error);
        throw error;
    } finally {
        c.release();
    }
}

module.exports = {
    addFornecedor,
    getFornecedorById,
    getAllFornecedores,
    updateFornecedor,
    deleteFornecedor,
}