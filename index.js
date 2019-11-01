const server = require("./server")


server.listen(process.env.port || 3000, () => {
    console.log('Listening to ' + (process.env.port || 3000))
})
