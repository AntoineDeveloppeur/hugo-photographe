"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_js_1 = __importDefault(require("@/backend/controllers/user.js"));
const router = express_1.default.Router();
router.put("/modifyPassword", user_js_1.default.modifyPassword);
router.post("/signIn", user_js_1.default.signIn);
exports.default = router;
