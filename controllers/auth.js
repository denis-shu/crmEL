const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
    const entity = await User.findOne({
        email: req.body.email
    })

    if (entity) {
        const passwordRes = bcrypt.compareSync(req.body.password, entity.password);

        if (passwordRes) {
            const token = jwt.sign({
                email: entity.email,
                userId: entity._id
            }, keys.jwt, {
                expiresIn: 60*30
            })

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'username or password does not match'
            })
        }
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
}

module.exports.register = async function (req, res) {
    const entity = await User.findOne({
        email: req.body.email
    })

    if (entity) {
        res.status(409).json({
            message: 'email is already in use. Try another'
        });
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save()
            res.status(201).json({
                user
            })
        } catch (e) {

        }
    }
}