const bcrypt = require('bcrypt');
const generator = require('generate-password');

const UserModel = require('../models/UserModel');
const PartnerModel = require('../models/PartnerModel');

const login = (req, res) => {
    const requiredParams = {
        email: req.body.email || null,
        password: req.body.password || null,
    };
    console.log(requiredParams)
    if(Object.values(requiredParams).some(param => param === null)) return res.status(400).json({
        ok: false,
        message: 'Faltan parámetros obligatorios',
        status: 2
    });
    if(requiredParams.email !== 'admin@admin.cl' || requiredParams.password !== 'admin'){
        return res.status(401).json({
            ok: true,
            message: 'El usuario ingresado no pertenece al sistema',
            status: 3
        });
    }

    return res.status(200).json({
        ok: true,
        message: 'Inicio de sesión exitoso',
        status: 1
    });
}

const requestInscription = async (req, res) => {
    const requiredParams = {
        email: req.body.email || null,
        rut: req.body.rut || null,
        name: req.body.name || null,
        lastNames: req.body.lastNames || null,
        phone: req.body.phone || null,
        address: req.body.address || null,
        license: req.files.license || null
    };
    console.log(requiredParams)
    if(Object.values(requiredParams).some(param => param === null)) return res.status(400).json({
        ok: false,
        message: 'Faltan parámetros obligatorios',
        status: 2
    });
    try {
        let originalExtension = requiredParams.license.name.split('.').pop();
        let path = `uploads/partners/license-${Math.floor(Date.now() / 1000)}.${originalExtension}`;
        requiredParams.license.mv(`src/public/${path}`, async (error) => {
            if(error){
                return res.status(500).json({
                    ok: true,
                    message: 'Hubo un error interno. Intente nuevamente.',
                    status: 0
                });
            }
            let password = generator.generate({ length: 8, numbers: true });
            let hashPassword = bcrypt.hashSync(password, 10);
            const user = await UserModel.createUser({
                email: requiredParams.email,
                password: hashPassword,
                role: 2
            });
            console.log(user);
            const partner = await PartnerModel.createPartner({
                userId: user.insertId,
                name: requiredParams.name,
                lastNames: requiredParams.lastNames,
                rut: requiredParams.rut,
                address: requiredParams.address,
                phone: requiredParams.phone,
                license: path,
                state: 1
            });
            console.log(partner)
            return res.status(200).json({
                ok: true,
                message: 'Solicitud enviada exitosamente. Se le notificará el estado de su solicitud durante los próximos 7 días.',
                status: 1
            });
        });

    } catch (error) {
        console.log('Error en inscripción: ', error);
        return res.status(500).json({
            ok: true,
            message: 'Hubo un error interno. Intente nuevamente.',
            status: 0
        });
    }
}

module.exports = {
    login,
    requestInscription
}