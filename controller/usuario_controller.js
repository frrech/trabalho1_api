const usuarioService = require('../service/usuario_service');

async function registerUsuario(req, res) {
    try {
        const nomeCompleto = req.body.nome;
        const email = req.body.email;
        const senha = req.body.senha;
        const newUser = await usuarioService.registerUsuario(nomeCompleto, email, senha);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function loginUsuario(req, res) {
    try {
        const { email, senha } = req.body;
        const user = await usuarioService.loginUsuario(email, senha);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function getAllUsuarios(req, res) {
    try {
        const usuarios = await usuarioService.getAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function getUsuarioById(req, res) {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.getUsuarioById(id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

async function deleteUsuario(req, res) {
    try {
        const { id } = req.params;
        await usuarioService.deleteUsuario(id);
        res.status(204).send();
    } catch (error) {
        res.status(error.id || 500).json({ error: error.message || "Erro interno." });
    }
}

module.exports = {
    registerUsuario,
    loginUsuario,
    getAllUsuarios,
    getUsuarioById,
    deleteUsuario
};
