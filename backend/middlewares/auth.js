const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    const token = req.cookies.access_token;

    try {
        var decoded = jwt.verify(token, 'secret');  //ta3ml verification ltoken bl key (secret)
        req.user = decoded
        next()
    } catch (err) {
        // err
        res.status(403).json({ message: 'invalid Token !' })
    }

}

module.exports = checkAuth