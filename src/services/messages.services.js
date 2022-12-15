import MessagesDAOMongo from "../DAO/message/MessagesDAOMongo.js";
import MessagesDAOFile from "../DAO/message/MessagesDAOFile.js";
import MessagesDAOMemory from "../DAO/message/MessagesDAOMemory.js";

let messagesDAO;
const PERS = process.env.PERS || "mongodb";

switch (PERS) {
    case "mongodb":
        messagesDAO = MessagesDAOMongo.createInstance();
        break;
    case "file":
        messagesDAO = MessagesDAOFile.createInstance();
        break;
    case "memory":
        messagesDAO = MessagesDAOMemory.createInstance();
        break;
};

async function createNewMessage(email, type, content) {
    return await messagesDAO.createMessage(email, type, content);
};

export { createNewMessage };