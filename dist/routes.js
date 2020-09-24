"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductController_1 = require("./controllers/ProductController");
var routes = express_1.Router();
routes.post('/products', ProductController_1.ProductStore);
routes.get('/products', ProductController_1.ProductIndex);
routes.put('/products/:id', ProductController_1.ProductSell);
exports.default = routes;
