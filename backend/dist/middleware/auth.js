"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
const userMiddleware = (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        const decoded = jsonwebtoken_1.default.verify(header, "SECRET");
        if (decoded) {
            //@ts-ignore
            req.userId = decoded.userId;
            next();
        }
        else {
            res.json({
                message: "you are not logined",
            });
        }
    }
    catch (error) {
        res.json({
            result: error,
        });
    }
};
exports.userMiddleware = userMiddleware;
