const mongoose = require('mongoose');
const Category = require('./Category');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: Category, required: true }
});

ItemSchema.virtual("url").get(function () {
    return `/items/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);