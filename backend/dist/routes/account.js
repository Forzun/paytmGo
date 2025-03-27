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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db/db");
const auth_1 = require("../middleware/auth");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get('/balance', auth_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const account = yield db_1.AccountModel.findOne({
            userId: userId,
        });
        res.json({
            balance: account === null || account === void 0 ? void 0 : account.balance
        });
    }
    catch (error) {
        res.json({
            message: "Connection error"
        });
    }
}));
router.post('/transfer', auth_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const { amount, to } = req.body;
        //@ts-ignore
        console.log(req.userId);
        //@ts-ignore
        const account = yield db_1.AccountModel.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            yield session.abortTransaction();
            res.status(400).json({
                message: "insufficient balance",
            });
            return;
        }
        const toAccount = yield db_1.AccountModel.findOne({ userId: to }).session(session);
        if (!toAccount) {
            yield session.abortTransaction();
            res.status(400).json({
                message: "Invalid account",
            });
            return;
        }
        //@ts-ignore
        yield db_1.AccountModel.updateOne({ userId: req.userId }, {
            $inc: {
                balance: -amount
            }
        }).session(session);
        yield db_1.AccountModel.updateOne({ userId: to }, {
            $inc: {
                balance: amount
            }
        }).session(session);
        yield session.commitTransaction();
        res.json({
            message: "Transfer Successfully"
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
}));
exports.default = router;
