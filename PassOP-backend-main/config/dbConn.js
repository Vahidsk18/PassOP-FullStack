const { setServers } = require("node:dns/promises");
setServers(["1.1.1.1", "8.8.8.8"]);


const mongoose = require("mongoose")


function ConnectDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Mongo Connected"))
        .catch(err => console.log(err))
}

module.exports = ConnectDb;
