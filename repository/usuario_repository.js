const pool = require('../db.js');

async function createUsuario(nomeCompleto, email, senha) {
    const query = `
        INSERT INTO usuario (nomeCompleto, email, senha)
        VALUES ($1, $2, $3)
        RETURNING id AS id, nomeCompleto, email, senha
    `;

    const values = [nomeCompleto, email, senha];
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
}

async function getUsuarioByEmail(email) {
    const query = `
        SELECT id AS id, nomeCompleto, email, senha
        FROM usuario
        WHERE email = $1
    `;

    const values = [email];
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erro ao buscar usuário por email:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
}

async function getAllUsuarios() {
    const query = `
        SELECT id AS id, nomeCompleto, email, senha
        FROM usuario
        ORDER BY id
    `;
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar todos usuários:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
}

async function getUsuarioById(id) {
    const query = `
        SELECT id AS id, nomeCompleto, email, senha
        FROM usuario
        WHERE id = $1
    `;

    const values = [parseInt(id, 10)];
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
}

async function deleteUsuario(id) {
    const query = `
        DELETE FROM usuario
        WHERE id = $1
    `;

    const values = [parseInt(id, 10)];
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rowCount > 0; 
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    } finally {
        if (client) client.release();
    }
}

module.exports = {
    createUsuario,
    getUsuarioByEmail,
    getAllUsuarios,
    getUsuarioById,
    deleteUsuario
};
