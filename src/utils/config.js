import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
}

export { nodemailerConfig, twilioConfig };