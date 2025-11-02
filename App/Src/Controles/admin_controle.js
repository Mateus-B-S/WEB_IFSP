const admin = require('../Modelos/admin_modelo');
//const path = require('path');

const loginAdmin = (req, res) => {
    const { senha } = req.body;
    if (senha && senha === admin.senha) {
        req.session.user = { tipo_conta: 'admin' }; // grava sessão
        res.render("Perfil/admin"); 
        // Renderiza a página de perfil do administrador
    }
    else {
        res.status(401).json({ mensagem: "Senha incorreta. Acesso negado." });
    }
};

const logoutAdmin = (req, res) => {
    req.session.destroy (err => {
        res.redirect('/inicial.html')
    }   );
};

module.exports = {
    logoutAdmin,
    loginAdmin
};