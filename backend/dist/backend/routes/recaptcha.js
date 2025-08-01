"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recaptcha_js_1 = __importDefault(require("@/backend/controllers/recaptcha.js"));
const router = express_1.default.Router();
exports.default = router.post("/", (req, res) => {
    (0, recaptcha_js_1.default)(req, res);
});
