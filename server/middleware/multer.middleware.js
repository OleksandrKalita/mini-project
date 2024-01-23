const multer = require("multer");

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = function (req, file, cb) {
    // const allowedTypes = /jpeg|jpg|png/;

    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png")  {
        cb(null, true);
    } else {
        cb(new Error("Error, You can upload only images!"))
    }
}
const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;