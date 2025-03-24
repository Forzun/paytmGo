"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://vbhavesh219:GLdKNb5gXUsAS351@cluster0.znlw8.mongodb.net/PaytmGo");
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    firstName: String,
    lastName: String,
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
