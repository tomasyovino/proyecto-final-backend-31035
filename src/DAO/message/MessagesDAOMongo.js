import MongoDbContainer from "../../containers/MongoDbContainer.js";
import { MessageModel } from "../../models/Message.js";
import { errorLogger } from "../../utils/loggers.js";

let instance = null;

class MessagesDAOMongo extends MongoDbContainer {
    constructor() {
        super(MessageModel);
    };

    static createInstance() {
        if (!instance) {
            instance = new MessagesDAOMongo();
        }
        return instance;
    };

    async createMessage(email, type, content) {
        try {
            let createdAt = Date.now();
            const today = new Date(createdAt);
            if(type === false) email = "examplecoder24@gmail.com";
            const newMessage = await MessageModel.create({
                email,
                type,
                dateAndTime: today.toUTCString(),
                content,
            });
            return newMessage;
        } catch (err) {
            errorLogger.error(err);
        };
    };
};

export default MessagesDAOMongo;