import express from "express";
import portfolioCtrl from "@/backend/controllers/portfolio.js";
import checkToken from "@/backend/middleware/checkToken.js";
const router = express.Router();
export default router.put("/update", (req, res, next) => {
    checkToken(req, res, next);
}, (req, res) => {
    portfolioCtrl.update(req, res);
});
router.get("/getPortfolio", (req, res) => {
    portfolioCtrl.getPortfolio(req, res);
});
