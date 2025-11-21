import mongoose from "mongoose";
const photoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    column: { type: String, required: true },
    src: { type: String, required: true },
    alt: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    priority: { type: Boolean, required: true },
});
const portfolioNewStructureSchema = new mongoose.Schema({
    portfolioNewStructure: {
        A: [photoSchema],
        B: [photoSchema],
        C: [photoSchema],
    },
});
// Gestion des erreurs d'unicité sans plugin externe
portfolioNewStructureSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoServerError" && error.code === 11000) {
        next(new Error("Ce nom de photo portfolio est déjà utilisée"));
    }
    else {
        next(error);
    }
});
const PortfolioNewStructure = mongoose.model("portfolioNewStructure", portfolioNewStructureSchema);
export default PortfolioNewStructure;
