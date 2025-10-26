const sequelize = require("../config/db.config");
const { QueryTypes } = require('sequelize');

exports.getProfile = async () => {
    const userProfile = await sequelize.query(`select * from users`,
        {
            type: QueryTypes.SELECT,
        }
    )
    return userProfile;

};


// exports.uploadImage = async (req, res) => {


//     return { success: true };
// }


exports.getImage = async (req, res) => {
    const id = req.params.id || req.query.id;

    const results = await sequelize.query(` SELECT FILENAME, MIMETYPE, IMAGE_BLOB FROM users  WHERE ID = :id `, {
        bind: { id },
        type: QueryTypes.SELECT
    })
    if (results.length === 0) {
        return res.status(404).json({ message: "Image Not Found" });
    }
    return results[0];

}