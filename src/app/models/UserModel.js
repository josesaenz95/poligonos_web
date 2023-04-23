const db = require('../../config/database');

const createUser = async (data) => {
    try {
        let query = `
            INSERT INTO users
            (email, password, roles_id)
            VALUES (?, ?, ?)
        `;
        let args = [data.email, data.password, data.role];
        let result = await db.query(query, args);
        return result;
    } catch (error) {
        console.log('Error al crear usuario: ', error);
        return undefined;
    }
}

module.exports = {
    createUser
}