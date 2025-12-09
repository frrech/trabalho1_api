const pool = require('../db.js')

async function createConta(cliente_id, saldo) {
    const query = 'INSERT INTO contas (cliente_id, saldo) VALUES ($1, $2) RETURNING *';
    const values = [cliente_id, saldo];
    
    try {
        const c = await pool.connect();
        const result = await c.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating conta:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function getContaById(id) {
    const query = 'SELECT * FROM contas WHERE id = $1';
    const values = [id];
    
    try {
        const c = await pool.connect();
        const result = await c.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching conta by id:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function getAllContas() {
    const query = 'SELECT * FROM contas ORDER BY id';
    
    try {
        const c = await pool.connect();
        const result = await c.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching contas:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function updateConta(id, conta) {
    const query = 'UPDATE contas SET cliente_id = $1, saldo = $2 WHERE id = $3 RETURNING *';
    const values = [conta.cliente_id, conta.saldo, id];
    
    try {
        const c = await pool.connect();
        const result = await c.query(query, values);
        return result.rows[0] ? true : false;
    } catch (error) {
        console.error('Error updating conta:', error);
        throw error;
    } finally {
        c.release();
    }
}

async function deleteConta(id) {
    const query = 'DELETE FROM contas WHERE id = $1';
    const values = [id];
    
    try {
        const c = await pool.connect();
        const result = await c.query(query, values);
        return result.rowCount > 0 ? true : false;
    } catch (error) {
        console.error('Error deleting conta:', error);
        throw error;
    } finally {
        c.release();
    }
}

/** deposits an amount into the account */
async function depositAmount(id, valor) {
    const conta = await getContaById(id);
    if (conta && typeof valor === 'number' && valor > 0) {
        const newSaldo = conta.saldo + valor;
        const query = 'UPDATE contas SET saldo = $1 WHERE id = $2 RETURNING *';
        const values = [newSaldo, id];
        
        try {
            const c = await pool.connect();
            const result = await c.query(query, values);
            return result.rows[0] ? true : false;
        } catch (error) {
            console.error('Error depositing amount:', error);
            throw error;
        } finally {
            c.release();
        }
    }
    return false;
}

module.exports = {
    createConta,
    getContaById,
    getAllContas,
    updateConta,
    deleteConta,
    depositAmount
};