import UsersDAOMongo from "../DAO/user/UserDAOMongo.js";
import UsersDAOFile from "../DAO/user/UserDAOFile.js";
import UsersDAOMemory from "../DAO/user/UserDAOMemory.js";
import bcrypt from "bcrypt";
import { nodemailerConfig } from "../utils/config.js";
import { config } from "../utils/config.js";
import { errorLogger } from "../utils/loggers.js";

let usersDAO;

switch (config.pers) {
    case "mongodb":
        usersDAO = UsersDAOMongo.createInstance();
        break;
    case "file":
        usersDAO = UsersDAOFile.createInstance();
        break;
    case "memory":
        usersDAO = UsersDAOMemory.createInstance();
        break;
};

async function listUserById(id) {
    return await usersDAO.findById(id);
}

async function listUserDeserialize(id) {
    return await usersDAO.userDeserialize(id);
};

async function findUserByEmail(parameter) {
    return await usersDAO.findByEmail(parameter);
};

async function createNewUser(username, password, email, direction, birthDate, phoneNumber, file) {
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        return await usersDAO.createUser(username, hashedPassword, email, direction, birthDate, phoneNumber, file);
    } catch (err) {
        errorLogger.error(err);
    };
};

async function sendNewUserAdviceEmail(username, email, direction, birthDate, phoneNumber) {
    try {
        const user_email = nodemailerConfig.adminEmail;
        const transporter = nodemailerConfig.transporter;

        const emailContent = {
            from: "coder-ecommerce",
            to: user_email,
            subject: "Nuevo usuario registrado",
            text: `
                User: ${username} 
                Email: ${email} 
                Address: ${direction} 
                Date of birth: ${birthDate} 
                Phone: ${phoneNumber}
            `
        }

        const info = await transporter.sendMail(emailContent);
        return info;
    } catch (err) {
        errorLogger.error(err);
    }
}

async function checkUser(email, password, done) {
    try {
        return await usersDAO.checkIfUserExist(email, password, done);
    } catch (err) {
        errorLogger.error(err);
    };
};

export { listUserById, findUserByEmail, createNewUser, sendNewUserAdviceEmail, checkUser, listUserDeserialize };