import { createNewMessage, getMessages, getMessage, deleteMessage, updateMessage } from "../services/messages.services.js";

async function createNewMessageController(email, content) {
    return await createNewMessage(email, content);
};

async function getMessagesController() {
    return await getMessages();
};

async function getMessageController(id) {
    return await getMessage(id);
};

async function deleteMessageController(id) {
    return await deleteMessage(id);
};

async function updateMessageController(id, obj) {
    return await updateMessage(id, obj);
};

export { createNewMessageController, getMessagesController, getMessageController, deleteMessageController, updateMessageController };