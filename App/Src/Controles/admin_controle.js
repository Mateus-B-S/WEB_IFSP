const admin = require('../Modelos/admin_modelo');
const path = require('path');

const loginAdmin = (req, res) => {
    const { senha } = req.body;
    if (senha && senha === admin.senha) {
        res.render(path.join(__dirname, "../Front_End/Perfil/admin")); 
        // Renderiza a página de perfil do administrador
    }
    else {
        res.status(401).json({ mensagem: "Senha incorreta. Acesso negado." });
    }
};

module.exports = {
    loginAdmin
};