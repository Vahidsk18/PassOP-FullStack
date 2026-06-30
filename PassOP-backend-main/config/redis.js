const { createClient } = require('redis')

const redisClient = createClient({
    url: process.env.REDIS_URL
})

redisClient.on("error", (err) => {
    console.log("redis error", err)
});

(async () => {

    await redisClient.connect()
    console.log("redis connected")

})()

module.exports = redisClient