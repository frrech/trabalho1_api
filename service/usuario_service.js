const usuarioRepository = require('../repository/usuario_repository');

async function registerUsuario(nomeCompleto, email, senha) {
    if (!nomeCompleto || !email || !senha) {
        throw { id: 400, message: "Nome, email e senha são obrigatórios." };
    }

    const existing = await usuarioRepository.getUsuarioByEmail(email);
    if (existing) {
        throw { id: 409, message: "Email já cadastrado." };
    }

    
    return await usuarioRepository.createUsuario(nomeCompleto, email, senha);
}

async function loginUsuario(email, senha) {
    if (!email || !senha) {
        throw { id: 400, message: "Email e senha são obrigatórios." };
    }

    const user = await usuarioRepository.getUsuarioByEmail(email);

    if (!user || user.senha !== senha) {
        throw { id: 401, message: "Credenciais inválidas." };
    }

    return {
        id: user.id,
        nomeCompleto: user.nomeCompleto,
        email: user.email
    };
}

async function getAllUsuarios() {
    const usuarios = await usuarioRepository.getAllUsuarios();

    if (!usuarios || usuarios.length === 0) {
        throw { id: 404, message: "Nenhum usuário encontrado." };
    }

    return usuarios;
}

async function getUsuarioById(id) {
    const usuario = await usuarioRepository.getUsuarioById(id);

    if (!usuario) {
        throw { id: 404, message: "Usuário não encontrado." };
    }

    return usuario;
}

async function deleteUsuario(id) {
    const deleted = await usuarioRepository.deleteUsuario(id);

    if (!deleted) {
        throw { id: 404, message: "Usuário não encontrado." };
    }

    return deleted;
}

module.exports = {
    registerUsuario,
    loginUsuario,
    getAllUsuarios,
    getUsuarioById,
    deleteUsuario
};
