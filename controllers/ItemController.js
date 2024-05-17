const Item = require("../models/Item");
const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item List");
});

exports.item_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Item Detail: ${req.params.id}`);
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