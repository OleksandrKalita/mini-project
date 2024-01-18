const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware");
const cloudinary = require("../utils/cloudinary");
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");

router.post("/upload-image", upload.single("image"), auth, async (req, res) => {
    await cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error",
            })
        }

        req.body.newAvatar = result.url;

        // res.json({
        //     success: true,
        //     message: "Uploaded!",
        //     data: result,
        // })
    })

    try {
        const userId = req.body.user.id;
        const newAvatar = req.body.newAvatar;

        const user = await User.findOneAndUpdate({_id: userId}, {$set: {avatar: newAvatar}}, {
            new: true,
        });

        return res.json({
            message: "Image uploaded!",
            user,
        });
    } catch (e) {
        return res.status(401).json({message: "Server error: " + e});
    }
});

router.post("/update-data", auth, async(req, res) => {
    try {
        const userId = req.body.user.id;
        const avatar = req.body.avatar;

        await User.updateOne({_id: userId}, {$set: {avatar,}});

        req.json({
            message: "Image was update!"
        })
    } catch (e) {
        return res.status(401).json({message: "Server error: " + e});
    }
})

module.exports = router;