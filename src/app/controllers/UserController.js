
const requestInscription = (req, res) => {
    console.log(req.body);
    console.log(req.body.email);
    console.log(req.body.name);
    console.log(req.files);

    return res.status(200).json({
        ok: true,
        message: 'Datos recibidos exitosamente',
        status: 1
    });
}

module.exports = {
    requestInscription
}