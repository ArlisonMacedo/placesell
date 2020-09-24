"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSell = exports.ProductIndex = exports.ProductStore = void 0;
var typeorm_1 = require("typeorm");
var Product_1 = require("../entity/Product");
exports.ProductStore = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, avatar, description, price, amount, whatsapp, product;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, name = _a.name, avatar = _a.avatar, description = _a.description, price = _a.price, amount = _a.amount, whatsapp = _a.whatsapp;
                return [4 /*yield*/, typeorm_1.getManager()
                        .createQueryBuilder()
                        .insert()
                        .into(Product_1.Product)
                        .values({
                        name: name,
                        avatar: avatar,
                        description: description,
                        price: price,
                        amount: amount,
                        whatsapp: whatsapp
                    })
                        .execute()];
            case 1:
                product = _b.sent();
                return [2 /*return*/, response.json(product)];
        }
    });
}); };
exports.ProductIndex = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var name, filterProducts, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = request.query.name;
                if (!name) return [3 /*break*/, 2];
                return [4 /*yield*/, typeorm_1.getManager()
                        .createQueryBuilder()
                        .select([
                        'product'
                    ])
                        .from(Product_1.Product, 'product')
                        .where('product.name like :name', { name: "%" + name + "%" })
                        .getMany()];
            case 1:
                filterProducts = _a.sent();
                return [2 /*return*/, response.json(filterProducts)];
            case 2: return [4 /*yield*/, typeorm_1.getManager()
                    .createQueryBuilder()
                    .select([
                    'product'
                ])
                    .from(Product_1.Product, 'product')
                    .getMany()];
            case 3:
                products = _a.sent();
                return [2 /*return*/, response.json(products)];
        }
    });
}); };
exports.ProductSell = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, id, existAmountProduct, countSellProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                amount = request.query.amount;
                id = request.params.id;
                return [4 /*yield*/, typeorm_1.getManager()
                        .createQueryBuilder()
                        .select('product')
                        .from(Product_1.Product, 'product')
                        .where('amount <= 0')
                        .andWhere('id = :id ', { id: id })
                        .getOne()];
            case 1:
                existAmountProduct = _a.sent();
                if (existAmountProduct) {
                    return [2 /*return*/, response.status(400).json({ err: 'There amount this product are empty' })];
                }
                return [4 /*yield*/, typeorm_1.getManager()
                        .createQueryBuilder()
                        .update(Product_1.Product)
                        .set({ amount: function () { return "amount - " + amount; } })
                        .where("id = :id", { id: id })
                        .execute()];
            case 2:
                countSellProduct = _a.sent();
                return [2 /*return*/, response.json(countSellProduct)];
        }
    });
}); };
