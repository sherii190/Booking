const Joi = require("joi");
const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({

    customer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cleaners: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    level: {
        type: String,
        required: true,
        trim: true
    },
    dated: {
        type: String,
        required: true,
    },
    time: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: 'New',
        enum: ['New', 'Assigned', 'Delivered', 'Completed', 'Rejected']
    },

}, { timestamps: true });

const Bookings = mongoose.model("bookings", bookingsSchema);

function validateBookings(booking) {
    const schema = {
        _id: Joi.string(),
        dated: Joi.string().min(2).required(),
        time: Joi.string().min(5).required(),
        level: Joi.string().min(5).required()
    };

    return Joi.validate(booking, schema);
}

exports.Bookings = Bookings;
exports.validate = validateBookings;
