import { createNewMessage } from "../services/messages.services.js";

async function createNewMessageController(email, type, content) {
    return await createNewMessage(email, type, content);
};

export { createNewMessageController };