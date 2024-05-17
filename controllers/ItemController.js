const Category = require("../models/Category");
const Item = require("../models/Item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    const allCategories = await Category.find().sort({ name: 1 }).exec();

    res.render("item_form", {
        title: "Create Item",
        categories: allCategories,
    });
});

exports.item_create_post = [
    body("name", "Item name must contain at least 1 character")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body("description", "Item description must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    body("price", "Item price must be a number bigger than 0")
        .trim()
        .optional({ checkFalsy: true })
        .isNumeric()
        .escape(),

    body("stock", "Item stock must be a number equal to or bigger than 0")
        .trim()
        .optional({ checkFalsy: true })
        .isNumeric()
        .escape(),

    body("category", "Item category must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        });

        if (!errors.isEmpty()) {
            const allCategories = await Category.find().sort({ name: 1 }).exec();

            res.render("item_form", {
                title: "Create Item",
                categories: allCategories,
                item: item,
                errors: errors.array(),
            });
            return;
        }

        const itemExists = await Item.findOne({ name: req.body.name })
            .collation({ locale: "en", strength: 2 })
            .exec();

        if (itemExists) {
            res.redirect(itemExists.url);
        } else {
            await item.save();
            res.redirect(item.url);
        }
    }),
];

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