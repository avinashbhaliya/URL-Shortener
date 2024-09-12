

const express = require('express');
const router = express.Router();
const URL = require('../models/url.js'); /// Make sure to import your URL model

router.get('/', async (req, res) => {
    try {
        const allUrls = await URL.find({});  // Fetch all URLs from the database
        return res.render("home", {
            urls: allUrls
        });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return res.status(500).send("Internal Server Error");
    }
});


router.get('/signup',async(req,res) =>{
    return res.render("signup");
})
router.get('/login',async(req,res) =>{
    return res.render("login");
})

module.exports = router;


// const express = require('express');


// const router = express.Router();

// router.get('/', async(req,res) => {
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         urls : allUrls
//     });
// })

// module.exports = router;
