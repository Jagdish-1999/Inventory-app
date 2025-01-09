import multer from "multer"

function uploadFilesMiddleware(req, res, next) {
    const storageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/images/");
        },
        filename: (req, file, cb) => {
            const name = Date.now() + "-" + file.originalname;
            cb(null, name);
        }
    })

    const uploads = multer({ storage: storageConfig }).single("imageUrl")
    uploads(req, res, (err) => {
        if (err) {
            return console.log("Error in multer uploads");
        }
        if (req.file) {
            req.body.imageUrl = "images/" + req.file.filename;
            next()
        }
    });

}
export default uploadFilesMiddleware;