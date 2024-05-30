const mongoose = require( 'mongoose' ) ;

const menuItemSchema = new mongoose. Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        enum: ['spicy', 'sweet', 'sour'],
        required: true,
    },
    is_drink: {
        type: Boolean,
        required: true,
        default: false,
    },
    ingredients: {
        type: [String],
        required: true,
        default: [],
    },
    num_sales: {
        type: Number,
        default: 0,
    }

});

// Create Menu Model
const MenuItem = new mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem; 