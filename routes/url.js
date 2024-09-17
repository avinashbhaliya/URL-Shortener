
const express = require('express');
const {handleGenerateNewURL} = require('../controllers/url.js');


const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const allUrls = await URL.find({});  // Fetch all URLs from the database
//         return res.render("home", {
//             urls: allUrls
//         });
//     } catch (error) {
//         console.error("Error fetching URLs:", error);
//         return res.status(500).send("Internal Server Error");
//     }
// });

// console.log("hello from my side");


router.post("/",handleGenerateNewURL);
module.exports = router;




