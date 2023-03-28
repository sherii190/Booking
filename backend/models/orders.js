const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    items: [{
        title: {
            type: String
        },
        img: {
            type: String
        },
        description: {
            type: String
        },
        category: {
            type: String
        },
        price: {
            type: Number
        },
        discount: {
            type: Number
        },
        quantity: {
            type: Number
        }
    }],
    card: {
        cvc: {
            type: String,
            required: true
        },
        expiry: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
    },
    amount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Orders = mongoose.model("orders", ordersSchema);

exports.Orders = Orders;
