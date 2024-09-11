
const {handleUserSignup} = require('../controllers/user.js');


const express = require('express');

const router = express.Router();

router.post('/',handleUserSignup);

module.export = router;
