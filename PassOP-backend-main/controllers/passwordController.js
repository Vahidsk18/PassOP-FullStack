const Password = require("../models/Password");
const asyncWrapper = require('../middlewares/asyncWrapper')
const AppError = require("../utils/AppError");
const redisClient  = require('../config/redis')


let createPassword = asyncWrapper(async (req, res) => {

    const password = await Password.create({

        ...req.body,
        userId: req.user.id

    });

    await redisClient.del(
        `passwords:${req.user.id}`
    );


    res.status(201).json({
        success: true,
        data: password
    });

});

let getPasswords = asyncWrapper(async (req, res) => {


    const cacheKey = `passwords:${req.user.id}`
    const cachePasswords = await redisClient.get(cacheKey)

    if (cachePasswords) {
        return res.status(200).json({
            success: true,
            data: JSON.parse(cachePasswords)
        })
    }

    const passwords = await Password.find({
        userId: req.user.id
    });

    await redisClient.set(cacheKey, JSON.stringify(passwords), { EX: 60 })


    res.status(200).json({
        success: true,
        data: passwords
    });

});

let updatePassword = asyncWrapper(async (req, res, next) => {


    const updatedPassword =
        await Password.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            req.body,
            {
                new: true,

                runValidators: true
            }
        )

    if (!updatedPassword) {
        return next(
            new AppError(
                "Password not found",
                404
            )
        );
    }

    await redisClient.del(
        `passwords:${req.user.id}`
    );


    res.status(200).json({
        success: true,
        data: updatedPassword
    });

});

let deletePassword = asyncWrapper(async (req, res, next) => {

    const deletedPassword =
        await Password.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

    if (!deletedPassword) {
        return next(
            new AppError(
                "Password not found",
                404
            )
        );
    }

    await redisClient.del(
        `passwords:${req.user.id}`
    );


    res.status(200).json({
        success: true,
        message: "Password deleted"
    });

});



module.exports = {
    createPassword,
    getPasswords,
    updatePassword,
    deletePassword,
}