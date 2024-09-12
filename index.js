const express = require("express");
const urlRoute = require('./routes/url.js');
const { connectMongoDB } = require("./connect.js");
const URL = require("./models/url.js");
const userRoute = require('./routes/user.js');
const path = require('path');
const staticRoute = require('./routes/staticRouter.js')



const app = express();
const PORT = 8001;


connectMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("Connection successful");
});


// for ejs file to render and  the 
app.set('view engine', "ejs");
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// app.get('/test',async(req,res) =>{ 
//     const allUrls = await URL.find({});
//     return res.render("home", {
//         url : allUrls
//     });

// })

app.use('/url', urlRoute);
app.use('/routes/url', urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);


app.get
    ('/:shortId', async (req, res) => {
        const shortId = req.params.shortId;

        try {

            // Find the document by shortId and update visit history
            const entry = await URL.findOneAndUpdate(
                { shortId }, // Query using shortId
                {
                    $push: {
                        visitHistory: {
                            timestamp: Date.now()
                        }
                    }
                },
                { new: true } // Return the updated document
            );

            // If the entry is not found, return a 404 error
            if (!entry) {
                return res.status(404).json({ error: "Short URL not found" });
            }

            // Redirect to the original URL
            res.redirect(entry.redirectURL);
        } catch (error) {
            // Handle any errors
            return res.status(500).json({ error: "Internal server error", details: error.message });
        }
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
