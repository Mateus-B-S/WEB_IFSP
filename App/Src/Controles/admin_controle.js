const admin = require('../Modelos/admin_modelo');

const loginAdmin = (req, res) => {
    const { senha } = req.body;
    if (senha && senha === admin.senha) {
        res.status(200).json({ mensagem: "Login de administrador bem-sucedido." });
        res.render('admin_dashboard'); // Renderiza a página do dashboard do administrador
    }
    else {
        res.status(401).json({ mensagem: "Senha incorreta. Acesso negado." });
    }
};

module.exports = {
    loginAdmin
};