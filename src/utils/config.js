import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

let config;

switch(NODE_ENV) {
    case "prod":
        config = {
            port: process.env.PORT,
            pers: process.env.PERS,
            mongo_uri: process.env.MONGO_URI,
            session_secret: process.env.SESSION_SECRET,

        };
        break;
    case "dev":
        config = {
            port: process.env.PORT_DEV,
            pers: process.env.PERS_DEV,
            mongo_uri: process.env.MONGO_URI_DEV,
            session_secret: process.env.SESSION_SECRET_DEV,
        };
        break;
};

const nodemailerConfig = {
    adminEmail: "examplecoder24@gmail.com",
    transporter: createTransport({
        service: "gmail",
        auth: {
            user: "examplecoder24@gmail.com",
            pass: "zvybfprvfdbskakv",
        },
    }),
};

const twilioConfig = {
    accountSid: "AC534ba76432f965c5909ac01251df04d9",
    authToken: "0175e38ffd54d994f88e458f07be5b69"
};

export { config, nodemailerConfig, twilioConfig };