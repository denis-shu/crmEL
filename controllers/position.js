const positionModel = require('../models/Position')
const errorHnadler = require('../Utils/errorHandler')

module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await positionModel.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        res.status(200).json({
            positions
        })
    } catch (e) {
        errorHnadler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const position = await new positionModel({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
        res.status(201).json({
            position
        })

    } catch (e) {
        errorHnadler(res, e)
    }
}

module.exports.delete = async function (req, res) {
    try {
        await positionModel.remove({
            _id: req.params.id
        })
        res.status(200).json({
            message: 'removal was successful'
        })
    } catch (e) {
        errorHnadler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const position = await positionModel.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json({
            position
        })
    } catch (e) {
        errorHnadler(res, e)
    }
}