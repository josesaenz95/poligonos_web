
const renderLogin = (req, res) => {
    res.render('login');
}

const renderInscription = (req, res) => {
    res.render('inscription');
}

module.exports = {
    renderLogin,
    renderInscription,
}