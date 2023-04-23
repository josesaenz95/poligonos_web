const express = require('express');

const router = express.Router();
const UserController = require('../app/controllers/UserController');

router.get('/', (req, res) => res.render('login'));
router.post('/request-inscription', UserController.requestInscription);

module.exports = router;
