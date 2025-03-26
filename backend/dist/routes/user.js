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
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const db_1 = require("../db/db");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const userSchema = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(5),
    firstName: zod_1.z.string().max(15),
    lastName: zod_1.z.string()
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, lastName } = req.body;
    const existingUser = yield db_1.UserModel.findOne({
        username: username
    });
    if (existingUser) {
        res.status(411).json({
            message: "User already created",
        });
        return;
    }
    const user = yield db_1.UserModel.create({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    });
    const userId = user._id;
    yield db_1.AccountModel.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    });
    if (user) {
        res.status(200).json({
            result: user,
        });
    }
    else {
        res.json({
            message: "User not able to connect",
        });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.UserModel.findOne({
        username: username,
        password: password
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            userId: user._id
        }, "SECRET");
        res.status(200).json({
            token: token
        });
    }
    else {
        res.json({
            message: "error while signin user"
        });
    }
}));
router.put("/", auth_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const user = yield db_1.UserModel.updateOne({ _id: req.userId }, req.body);
    if (user) {
        res.status(200).json({
            result: "user updated sucessfully",
        });
    }
    else {
        res.json({
            message: "Error while updating user"
        });
    }
}));
router.get("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || "";
    const users = yield db_1.UserModel.find({
        $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
    });
    console.log(users);
}));
exports.default = router;
