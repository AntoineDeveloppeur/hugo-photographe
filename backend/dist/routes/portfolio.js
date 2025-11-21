import express from "express";
import portfolioCtrl from "../controllers/portfolio.js";
import checkToken from "../middleware/checkToken.js";
const router = express.Router();
router.put("/update", (req, res, next) => {
    checkToken(req, res, next);
}, (req, res) => {
    portfolioCtrl.update(req, res);
});
router.put("/updateNewStructure", (req, res, next) => {
    checkToken(req, res, next);
}, (req, res) => {
    portfolioCtrl.updateNewStructure(req, res);
});
router.get("/getPortfolio", (req, res) => {
    portfolioCtrl.getPortfolio(req, res);
});
router.get("/getPortfolioNewStructure", (req, res) => {
    portfolioCtrl.getPortfolioNewStructure(req, res);
});
export default router;
