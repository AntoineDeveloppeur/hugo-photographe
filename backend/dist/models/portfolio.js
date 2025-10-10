import mongoose from "mongoose";
const portfolioSchema = new mongoose.Schema({
    portfolio: [
        {
            id: { type: String, required: true, unique: true },
            column: { type: String, required: true },
            src: { type: String, required: true },
            alt: { type: String, required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
            priority: { type: Boolean, required: true },
        },
    ],
});
// Gestion des erreurs d'unicité sans plugin externe
portfolioSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoServerError" && error.code === 11000) {
        next(new Error("Ce nom de photo portfolio est déjà utilisée"));
    }
    else {
        next(error);
    }
});
const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
