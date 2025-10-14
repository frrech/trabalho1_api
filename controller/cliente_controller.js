const cliente_service = require('../service/cliente_service');

async function createCliente(req, res) {
    try {
        const { nome, email, matricula } = req.body;
        const newCliente = cliente_service.createCliente(nome, email, matricula);
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(error.id).json({ error: error.message });
    }
}

async function getAllClientes(req, res) {
    try {
        const clientes = cliente_service.getAllClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(error.id).json({ error: error.message });
    }
}

async function getClienteById(req, res) {
    try {
        const { id } = req.params;
        const cliente = cliente_service.getClienteById(id);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(error.id).json({ error: error.message });
    }
}

async function updateCliente(req, res) {
    try {
        const { id } = req.params;
        const { nome, email, matricula } = req.body;
        const updatedCliente = cliente_service.updateCliente(cliente);
        res.status(200).json(updatedCliente);
    } catch (error) {
        res.status(error.id).json({ error: error.message });
    }
}

async function deleteCliente(req, res) {
    try {
        const { id } = req.params;
        cliente_service.deleteCliente(id);
        res.status(204).send();
    } catch (error) {
        res.status(error.id).json({ error: error.message });
    }
}

module.exports = {
    createCliente,
    getAllClientes,
    getClienteById,
    updateCliente,
    deleteCliente
};