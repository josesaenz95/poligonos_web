
const renderLogin = (req, res) => {
    res.render('login');
}

const renderLogout = (req, res) => {
    res.render('login');
}

const renderInscription = (req, res) => {
    res.render('inscription');
}

const renderIndex = (req, res) => {
    res.render('index');
}

module.exports = {
    renderLogin,
    renderLogout,
    renderInscription,
    renderIndex
}