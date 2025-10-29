import photoCtrl from "@/backend/controllers/photo.js";
import express from "express";
import checkToken from "@/backend/middleware/checkToken.js";
const router = express.Router();
export default router.post("/upload", (req, res, next) => {
    checkToken(req, res, next);
}, (req, res) => {
    photoCtrl.upload(req, res);
});
router.delete("/delete", (req, res, next) => {
    checkToken(req, res, next);
}, (req, res) => {
    photoCtrl.delete(req, res);
});
