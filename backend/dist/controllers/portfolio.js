import Portfolio from "../models/portfolio.js";
import formatError from "../utils/formatError.js";
const portfolioCtrl = {
    update: async (req, res) => {
        console.log("portfolioCtrl req.body", req.body);
        try {
            await Portfolio.findOneAndUpdate({}, { portfolio: req.body }, {
                upsert: true,
            });
            res.status(201).json({ message: "porfolio mis à jour" });
        }
        catch (error) {
            const errorMessage = formatError(error);
            res.status(500).json({ error: errorMessage });
        }
    },
    getPortfolio: async (req, res) => {
        Portfolio.find()
            .then((data) => {
            console.log(data[0].portfolio);
            res.status(200).json({ photos: data[0].portfolio });
        })
            .catch((error) => {
            const errorMessage = formatError(error);
            res.status(500).json({ error: errorMessage });
        });
    },
};
export default portfolioCtrl;
