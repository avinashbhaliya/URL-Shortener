const express = require("express");
const urlRouter = require('./routes/url.js');
const { connectMongoDB } = require("./connect.js");
const URL = require("./models/url.js");

const app = express();
const PORT = 8001;

// Connect to MongoDB
connectMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("Connection successful");
});

app.use(express.json());

// Route to handle redirection using the shortId
app.get('/:shortId', async (req, res) => {
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

// Route for URL shortening
app.use('/url', urlRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
