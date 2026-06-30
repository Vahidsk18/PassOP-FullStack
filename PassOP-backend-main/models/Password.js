const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema(
    {
        website: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });

passwordSchema.index({ userId: 1 });

module.exports = mongoose.model("Password", passwordSchema);