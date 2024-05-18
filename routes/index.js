var express = require('express');
var router = express.Router();
const asyncHandler = require("express-async-handler");

const itemController = require("../controllers/ItemController");
const categoryController = require("../controllers/CategoryController");

const Item = require("../models/Item");
const Category = require("../models/Category");

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {

  const [numItems, numCategories] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec()
  ]);

  res.render('index', { title: "Odin Inventory", item_count: numItems, category_count: numCategories });
}));

// CATEGORY ROUTES
router.get('/categories', categoryController.category_list);

router.get('/category/create', categoryController.category_create_get);

router.post('/category/create', categoryController.category_create_post);

router.get('/category/:id', categoryController.category_detail);

router.get('/category/:id/update', categoryController.category_update_get);

router.post('/category/:id/update', categoryController.category_update_post);

router.get('/category/:id/delete', categoryController.category_delete_get);

router.post('/category/:id/delete', categoryController.category_delete_post);

//ITEM ROUTES
router.get('/items', itemController.item_list);

router.get('/item/create', itemController.item_create_get);

router.post('/item/create', itemController.item_create_post);

router.get('/item/:id', itemController.item_detail);

router.get('/item/:id/update', itemController.item_update_get);

router.post('/item/:id/update', itemController.item_update_post);

router.get('/item/:id/delete', itemController.item_delete_get);

router.post('/item/:id/delete', itemController.item_delete_post);

module.exports = router;
