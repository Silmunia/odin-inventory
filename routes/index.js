var express = require('express');
var router = express.Router();

const itemController = require("../controllers/ItemController");
const categoryController = require("../controllers/CategoryController");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Odin Inventory' });
});

// CATEGORY ROUTERS
router.get('/categories', categoryController.category_list);

router.get('/category/:id', categoryController.category_detail);

router.get('/category/create', categoryController.category_create_get);

router.post('/category/create', categoryController.category_create_post);

router.get('/category/:id/update', categoryController.category_update_get);

router.post('/category/:id/update', categoryController.category_update_post);

router.get('/category/:id/delete', categoryController.category_delete_get);

router.post('/category/:id/delete', categoryController.category_delete_post);

module.exports = router;
