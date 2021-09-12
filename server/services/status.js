// Send the message to a specific user
const sendMessage = (wsClients, userId, json) => {
    if (wsClients.hasOwnProperty(userId))
        wsClients[userId].sendUTF(json)
}
module.exports = {
    // Only allow `localhost:8080` to connect
    originIsAllowed: (origin) => {
        if (origin === 'http://localhost:8080')
            return true

        console.log((new Date()) + ' Connection from origin ' + origin + 'rejected.');
        return false
    },
    // Only allow `/status` pathname
    pathnameIsAllowed: (pathname, origin) => {
        if (pathname === '/reservations/notification')
            return true
        console.log((new Date()) + ' Connection from origin ' + origin + 'rejected.');
        return false
    },
    assignUser: (wsClients, connection, origin) => {
        let userId = Date.now()
        console.log((new Date()) + ' Received a new connection from origin ' +
            origin + '.')

        wsClients[userId] = connection
        console.log('connected: ' + userId + ' in ' +
            Object.getOwnPropertyNames(wsClients))
        connection.sendUTF(JSON.stringify({ userId: userId }))
        return wsClients
    },
    incomingMessageHandler: (message, wsClients) => {
        if (message.type === 'utf8') {
            console.log(message)
            const data = JSON.parse(message.utf8Data)
            // We have a simple bot.
            // When client says 'GME', we send them a emojis message.
            if (data.hasOwnProperty('id') &&
                data.hasOwnProperty('text') &&
                data.text === 'GME'
            )
                sendMessage(wsClients, data.id, JSON.stringify({ message: '🚀🚀🚀 🌕' }))
        }
    },
    sendNotification: (message, wsClients) => {
        const data = JSON.pase(message.utf8Data)
        console.log(message)
        console.log(wsClients)
        sendMessage(wsClients, data.id, JSON.stringify({ message: "Hello" }))
    }
}