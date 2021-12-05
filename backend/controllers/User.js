const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

function signToken(userID, role) {
    return jwt.sign({
        iss: 'moonServer',
        sub: userID,
        role: role,
    }, 'secret', { expiresIn: '1h' })
}

module.exports = {
    register: (req, res) => {

        const { email, password, name } = req.body

        if (!email || !password || !name)
            return res.status(400).json({ message: 'please enter all fields' })

        User.findOne({ email: email }, async (err, user) => {
            if (!user) {

                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                const newuser = new User({
                    name: name,
                    email: email,
                    password: hash
                })
                User.create(newuser, (err, user) => {
                    if (err) {
                        res.status(500).json({
                            message: 'user not created'
                        })
                    } else {

                        setTimeout(() => {

                            res.status(200).json({
                                message: 'user successfult created'
                            })
                        }, 5000);
                    }
                })

            } else {
                res.status(400).json({
                    message: 'user with this email is already exist'
                })
            }
        })
    },
    login: (req, res) => {
        const { email, password } = req.body

        if (!email || !password)
            return res.status(400).json({ message: 'please enter all fields' })

        User.findOne({ email }, async (err, user) => {
            if (!user) {
                res.status(403).json({ message: 'user with email does not exist' })
            } else {
                const ismatch = await bcrypt.compare(password, user.password)

                if (ismatch) {
                    console.log('ismatch');
                    const token = signToken(user._id, user.role);
                    res.cookie("access_token", token, { maxAge: 3600 * 1000, httpOnly: true, sameSite: true });
                    return res.status(200).json({ isAuthenticated: true, role: user.role })
                } else {
                    res.status(403).json({ message: 'invalid password !' })
                }
            }
        })
    },
    isAuthenticated: (req, res) => {
        const { role } = req.user
        return res.status(200).json({ isAuthenticated: true, role: role })
    }
    ,
    logout: (req, res) => {
        res.clearCookie("access_token");

        return res.status(200).json({ success: true, user: { email: "", role: "" } })
    }
    ,
    getMe: (req, res) => {
        const { sub } = req.user

        User.findOne({ _id: sub }, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: 'user not found',
                    data: null
                })
            } else {

                res.status(200).json({
                    message: 'user found',
                    data: user
                })
            }
        })

    },
    uploadAvatar: (req, res) => {
        const { sub } = req.user

        User.findByIdAndUpdate({ _id: sub }, { avatar: req.file.filename }, { new: true },
            (err, user) => {
                if (err) {
                    res.status(500).json({
                        message: 'error uploading avatar',
                        data: null
                    })

                } else {
                    res.status(200).json({
                        message: ' uploading avatar success',
                        data: user
                    })

                }
            })
    },
    update: (req, res) => {
        const { sub } = req.user

        User.findByIdAndUpdate({ _id: sub }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: 'error updating user',
                    data: null
                })
            } else {
                res.status(200).json({
                    message: 'user successfuly updated',
                    data: user
                })
            }
        })
    },

}