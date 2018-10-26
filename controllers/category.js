const categoryModel = require('../models/Category');
const positionModel = require('../models/Position');
const errorHandler = require('../Utils/errorHandler');


module.exports.getAll = async function (req, res) {
    try {
        const categories = await categoryModel.find({
            user: req.user.id
        })
        res.status(200).json({
            categories
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const category = await categoryModel.findById(req.params.id)
        res.status(200).json({
            category
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async function (req, res) {
    try {
        await categoryModel.remove({
            _id: req.params.id
        })
        await positionModel.remove({
            category: req.params.id
        })
        res.status(200).json({
            message: 'removal was successful'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const category = new categoryModel({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''

    })
    try {
        await category.save();
        res.status(201).json({
            category
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name
    };
    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const category = await categoryModel.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        })
        res.status(200).json({
            category
        })
    } catch (e) {
        errorHandler(res, e)
    }
}