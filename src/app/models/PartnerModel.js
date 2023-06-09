const db = require('../../config/database');

const createPartner = async (data) => {
    try {
        let query = `
            INSERT INTO partners
            (users_id, name, last_names, rut, address, phone, license, state)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        let args = [data.userId, data.name, data.lastNames, data.rut, data.address, data.phone, data.license, data.state];
        let result = await db.query(query, args);
        return result;
    } catch (error) {
        console.log('Error al crear usuario: ', error);
        return undefined;
    }
}

const getInscriptions = async () => {
    try {
        let query = `
            SELECT
                u.id userId,
                p.id partnerId,
                CONCAT(p.name, ' ', p.last_names) fullName,
                p.rut,
                p.address,
                p.phone,
                s.name state,
                DATE_FORMAT(p.created_at, '%Y-%m-%d') createdAt,
                p.license
            FROM partners p
            JOIN users u ON p.users_id = u.id
            JOIN roles r ON u.roles_id = r.id
            JOIN states s ON p.state = s.id
        `;
        let result = await db.query(query, []);
        return result;
    } catch (error) {
        console.log('Error al crear usuario: ', error);
        return undefined;
    }
}

const updateInscription = async (data) => {
    try {
        let query = `
            UPDATE partners
            SET state = ?
            WHERE id = ?
        `;
        let args = [data.state, data.partnerId];
        let result = await db.query(query, args);
        return result;
    } catch (error) {
        console.log('Error al crear usuario: ', error);
        return undefined;
    }
}

module.exports = {
    createPartner,
    getInscriptions,
    updateInscription
}