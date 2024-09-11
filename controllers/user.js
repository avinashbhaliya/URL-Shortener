
const User = require('../models/user.js')

 async function handleUserSignup(req,res) {
        const {name, email, password} = req.body
        await User.create({
            name,
            email,
            password
        });

        return res.render("")
}

module.exports = {
    handleUserSignup,
}