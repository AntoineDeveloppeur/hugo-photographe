import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    //Prendre en compte l'_id de mongoose pour répondre à une requête get
    title: {type: String, required: true, unique: true},
    summary: {type: String, required: true},
    mainPhoto: {
        src: {type: Object, required: true},       
        alt: {type: String, required: true},
        width: {type: Number, required: true},
        height: {type: Number, required: true},
    },
    textsAbovePhotos: {type: [String], required: false},
    photosSets: {type: [[
        {
        src: {type: String, required: true},
        alt: {type: String, required: true},
        width: {type: Number, required: true},
        height: {type: Number, required: true},
        }
    ]]},
    textsBelowPhotos: {type: [String], required: false},
})

// Gestion des erreurs d'unicité sans plugin externe
projectSchema.post('save', function(error: any, doc: any, next: any) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Ce nom de projet est déjà utilisée'));
    } else {
        next(error);
    }
});


const Project = mongoose.model('Projet',projectSchema)
export default Project