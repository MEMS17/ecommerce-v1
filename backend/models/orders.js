const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordersSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    }
});
// Create the Order model
const Order = mongoose.model('Order', ordersSchema);
// Export the Order model
module.exports = Order;