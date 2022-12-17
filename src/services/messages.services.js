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

async function createNewMessage(email, content) {
    return await messagesDAO.createMessage(email, content);
};

async function getMessages() {
    return await messagesDAO.listAll();
};

async function getMessage(id) {
    return await messagesDAO.list(id);
};

async function deleteMessage(id) {
    return await messagesDAO.delete(id);
};

async function updateMessage(id, obj) {
    return await messagesDAO.updateMessage(id, obj);
};

export { createNewMessage, getMessages, getMessage, deleteMessage, updateMessage };