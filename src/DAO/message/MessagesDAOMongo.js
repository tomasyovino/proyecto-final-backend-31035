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

    async createMessage(email, content) {
        try {
            const newMessage = await MessageModel.create({
                email,
                content,
            });
            return newMessage;
        } catch (err) {
            errorLogger.error(err);
        };
    };

    async updateMessage(id, obj) {
        try {
            const updateMessage = await MessageModel.findByIdAndUpdate(id, obj);
            return updateMessage;
        } catch (err) {
            errorLogger.error(err);
        };
    };
};

export default MessagesDAOMongo;