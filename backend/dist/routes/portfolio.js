import express from "express";
import portfolioCtrl from "../controllers/portfolio.js";
import checkToken from "../middleware/checkToken.js";
const router = express.Router();
router.put("/update", (req, res, next) => {
    checkToken(req, res, next);
}, (req, res) => {
    portfolioCtrl.update(req, res);
});
router.get("/getPortfolio", (req, res) => {
    portfolioCtrl.getPortfolio(req, res);
});
export default router;
