const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }
});

ItemSchema.virtual("url").get(function () {
    return `/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);