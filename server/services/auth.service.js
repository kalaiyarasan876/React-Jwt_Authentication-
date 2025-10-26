const sequelize = require("../config/db.config");
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcryptjs');


exports.registerUserService = async ({ name, email, password }) => {

    const existing = await sequelize.query(`select * from users where email= :email`, {
        replacements: { email }, type: QueryTypes.SELECT
    })

    if (existing.length > 0) {
        throw new Error(`User already Exist`);
    }

//    const salt = bcrypt.genSaltSync(password, 10)
    const hashPassword = await bcrypt.hash(password, 10);

    await sequelize.query(`insert into users(name, email, password) values (:name,:email,:password)`, {
        replacements: { name, email, password: hashPassword },
        type: QueryTypes.INSERT
    });

    const [user] = await sequelize.query(`select * from users where email = :email`,
        { replacements: { email }, type: QueryTypes.SELECT }
    );

    return user;
};



exports.loginUserService = async ({ name, password }) => {
    const [user] = await sequelize.query(`select * from users where name = :name`, {
        replacements: { name }, type: QueryTypes.SELECT
    });

    if (!user) throw new Error("User Not Found");

    const validPassword = await bcrypt.compare(password, user.PASSWORD);
    if (!validPassword) throw new Error("Invalid Password");

    // if(user.CURRENT_TOKEN){
    //     throw new Error(`User already logged in from another device`);
    // }

    return user;
}

