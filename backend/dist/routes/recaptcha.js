import express from "express";
import recaptcha from "../controllers/recaptcha.js";
const router = express.Router();
export default router.post("/", (req, res) => {
    recaptcha(req, res);
});
