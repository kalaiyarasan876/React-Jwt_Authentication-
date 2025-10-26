const { QueryTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const profileService = require("../services/profileService");

exports.getProfile = async (req, res, next) => {
    try {
        const [profile] = await profileService.getProfile();
        // console.log("profile", profile);

        res.status(200).json({
            success: true,
            data: profile
        });

    } catch (err) {
        next(err);
    }
}

exports.uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded!" });
        }
        return res.status(200).json({
            message: "Successfully Uploaded Image!",
            result: { success: true }
        });

    } catch (error) {
        console.error("Upload error:", error);
        next(error)
    }
}




/*
exports.getImage = async (req, res, next) => {
    try {
        const image = await profileService.getImage(req, res);
        if (!image) {
            return res.status(404).json({ message: "Image Not Found" });
        }
        res.setHeader("Content-Type", image.MIMETYPE);
        res.setHeader("Content-Disposition", `inline; filename="${image.FILENAME}"`);
        res.send(image.IMAGE_BLOB);

    } catch (error) {
        next(error);
    }
}






const id = req.params.id || req.query.id;
const { originalname, mimetype, buffer } = req.file;
console.log("id", id);
console.log("req.file", req.file);

await sequelize.query(`
     UPDATE users
SET filename = :filename,
    mimetype = :mimetype,
    IMAGE_BLOB =:IMAGE_BLOB
WHERE id = :id`,
    {
        type: sequelize.QueryTypes.UPDATE,
        replacements: {
            id,
            filename: originalname,
            mimetype,
            IMAGE_BLOB: buffer
        },
    })
*/