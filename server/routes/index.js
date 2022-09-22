const express = require('express');
// controllers
const users = require('../controllers/user.js');
// middlewares
const { encode } = require('../middlewares/jwt.js');

const router = express.Router();

router.post('/login/:userId', encode, (req, res, next) => { });

export default router;