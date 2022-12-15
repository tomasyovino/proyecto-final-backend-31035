import dotenv from "dotenv";
import { mongoConnect } from "../utils/config.js";
import { errorLogger } from "../utils/loggers.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://tomyov24:Alessandro.24@cluster0.zft9dcg.mongodb.net/coder-ecommerce?retryWrites=true&w=majority";
mongoConnect(MONGO_URI);

class MongoDbContainer {
    constructor(collection) {
        this.collection = collection;
    }

    async listAll() {
        try {
            const elements = await this.collection.find().lean();
            return elements;
        } catch (err) {
            errorLogger.error(err)
        }
    }

    async list(id) {
        const element = await this.collection.findById(id);
        return element;
    }

    async delete(id) {
        const element = await this.collection.findByIdAndDelete(id);
        return this.listAll();
    }

    async update(obj) {
        const element = await this.collection.findByIdAndUpdate(obj.id, { $set: obj }, { new: true });
        return element;
    }
}

export default MongoDbContainer;