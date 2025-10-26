const { QueryInterface, QueryTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const { registerUserService, loginUserService } = require("../services/auth.service");
const { generateToken } = require("../utils/generateToken");


exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUserService({ name, email, password });

        const token = generateToken(user.ID);

        res.cookie("token", token, { sameSite: "lax", maxAge: 86400, httpOnly: true });
        res.status(201).json({
            token,
            user: {
                id: user.ID,
                name: user.NAME,
                email: user.EMAIL,
                // token: generateToken(user.ID)
            }
        });

    } catch (err) {
        next(err);
    }
}


exports.loginUser = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const user = await loginUserService({ name, password });
        const token = generateToken(user.ID);

        //if(!user)  throw new Error("User Not Found");

        // await sequelize.query(`update users set current_token = :token where id=:id`, {
        //     replacements: { token, id: user.ID }, type: QueryTypes.UPDATE
        // });

        res.cookie("token", token, { sameSite: "lax", maxAge: 86400, httpOnly: true });
        res.status(200).json({
            success: true,
            message: "Login Successfully!",
            token,
            user: {
                id: user.ID,
                name: user.NAME,
                email: user.EMAIL,
            }
        })

    } catch (err) {
        next(err)
    }
}



exports.logoutUser = async (req, res, next) => {
    try {
        // const token = req.cookies.token;

        // if (!token) {
        //     return res.status(400).json({ success: false, message: "No token found" });
        // }
        // await sequelize.query(`update users set current_token = null where current_token=:token`, {
        //     replacements: { token }, type: QueryTypes.UPDATE
        // })
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User Successfully Logout!"
        })
    } catch (error) {
        next(error);
    }
}


exports.getUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const [user] = await sequelize.query(`SELECT ID, NAME, EMAIL FROM USERS WHERE ID = :id`, {
            replacements: { id: userId },
            type: QueryTypes.SELECT
        })
        if (!user) {
            res.status(404).json({ success: false, message: "User Not Found~" });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user.ID,
                name: user.NAME,
                email: user.EMAIL,
            }
        })

    } catch (error) {
        next(error);
    }
}