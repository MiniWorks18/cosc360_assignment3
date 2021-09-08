const { PORT } = require('./config')
module.exports = {
    options: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Reservations',
                version: '0.0.1',
                description: 'A restaurant reservations handler'
            },
        },
        host: `localhost:${PORT}`,
        basePath: '/',
        apis: ['./routes/reservation.js'],
    }
}
