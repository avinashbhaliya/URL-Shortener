// const shortId = require("shortid");
const URL = require("../models/url.js");
const shortid = require("shortid");


async function handleGenerateNewURL(req, res) {

    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" })
    const shortId = shortid.generate();
    console.log(req.user._id);

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        // createdBy: req.user._id
    });

    return res.render("home", {
        id: shortId
    })

    // return res.json({id : shortId});
}

module.exports = { handleGenerateNewURL };

