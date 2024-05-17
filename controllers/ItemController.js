const Category = require("../models/Category");
const Item = require("../models/Item");
const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find().sort({ name: 1 }).exec();

    res.render("item_list", {
        title: "Item List",
        items: allItems,
    });
});

exports.item_detail = asyncHandler(async (req, res, next) => {

    const selectedItem = await Item.findById(req.params.id).exec();

    if (selectedItem === null) {
        const error = new Error("Item not found");
        error.status = 404;
        return next(error);
    }

    const itemCategory = await Category.findById(selectedItem.category).exec();

    res.render("item_detail", {
        item: selectedItem,
        item_category: itemCategory.name,
    });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item create GET");
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item create POST");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update GET");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update POST");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete GET");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete POST");
});