"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_js_1 = require("@/backend/controllers/project.js");
const checkToken_js_1 = __importDefault(require("@/backend/middleware/checkToken.js"));
const router = express_1.default.Router();
// Use the createProject function as middleware with proper type handling
router.post("/create", (req, res, next) => {
    (0, checkToken_js_1.default)(req, res, next);
}, (req, res) => {
    (0, project_js_1.createProject)(req, res);
});
router.get("/getProjects", (req, res) => {
    (0, project_js_1.getProjects)(req, res);
});
router.delete("/deleteProject/:id", (req, res, next) => {
    (0, checkToken_js_1.default)(req, res, next);
}, (req, res) => {
    (0, project_js_1.deleteProject)(req, res);
});
exports.default = router;
