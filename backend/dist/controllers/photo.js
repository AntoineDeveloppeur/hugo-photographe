import parseForm from "../utils/parseForm.js";
import uploadPhoto from "../utils/uploadPhoto.js";
import formatError from "../utils/formatError.js";
import { v4 as uuidv4 } from "uuid";
import { deleteOnePhotoFromDB } from "../utils/deletePhotos.js";
const photoCtrl = {
    upload: async (req, res) => {
        try {
            console.log(" je suis dans photoCtrl");
            const { files } = await parseForm(req);
            const file = files["photo"];
            const url = await uploadPhoto(file);
            console.log(" je suis dans photoCtrl après UPLOADphoto");
            const data = {
                id: uuidv4(),
                url: url,
                width: file.width,
                height: file.height,
            };
            res.status(201).json({ data: data });
        }
        catch (error) {
            const errorMessage = formatError(error);
            res.status(500).json({ error: errorMessage });
        }
    },
    delete: async (req, res) => {
        const { success, error } = await deleteOnePhotoFromDB(req.body.url);
        console.log("après appel de deleteOnePhotoFromDb depuis photoCtrl");
        if (success) {
            console.log("après appel de deleteOnePhotoFromDb avant res.status(200)");
            res.status(200).json({});
        }
        else {
            console.log("après appel de deleteOnePhotoFromDb avant res.status(500)");
            res.status(500).json({ error });
        }
    },
};
export default photoCtrl;
