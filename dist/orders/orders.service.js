"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteordersService = exports.updateordersService = exports.createordersService = exports.getordersService = exports.ordersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const ordersService = async (limit) => {
    if (limit) {
        return await db_1.default.query.orderstable.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.orderstable.findMany();
};
exports.ordersService = ordersService;
const getordersService = async (id) => {
    return await db_1.default.query.orderstable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.orderstable.id, id)
    });
};
exports.getordersService = getordersService;
const createordersService = async (user) => {
    await db_1.default.insert(schema_1.orderstable).values(user);
    return "User created successfully";
};
exports.createordersService = createordersService;
const updateordersService = async (id, user) => {
    await db_1.default.update(schema_1.orderstable).set(user).where((0, drizzle_orm_1.eq)(schema_1.orderstable.id, id));
    return "User updated successfully";
};
exports.updateordersService = updateordersService;
const deleteordersService = async (id) => {
    await db_1.default.delete(schema_1.orderstable).where((0, drizzle_orm_1.eq)(schema_1.orderstable.id, id));
    return "User deleted successfully";
};
exports.deleteordersService = deleteordersService;
