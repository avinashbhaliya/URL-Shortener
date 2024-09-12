
const express = require('express');
const {handleGenerateNewURL} = require('../controllers/url.js');


const router = express.Router();
// console.log("hello from my side");

router.post("/",handleGenerateNewURL);
module.exports = router;




