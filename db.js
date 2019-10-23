const mongo = require("mongodb").MongoClient;

const dsn = "mongodb://localhost:27017/chat"

async function usingCollection(dsn, colName, f) {
    const client  = await mongo.connect(dsn);
    const db = client.db();
    const col = db.collection(colName);

    const result = await f(col);

    client.close();

    return result;
}

module.exports = {
    saveMessage: (messages) => {
        usingCollection(dsn, "savedMessages", col => {
            col.insert(messages);
        });
    },
    getSavedMessages: async () => {
        return await usingCollection(dsn, "savedMessages", async col => {
            return await col.find().limit(100).toArray();
        });
    }
};
