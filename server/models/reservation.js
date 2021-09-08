// Reservation model describes what a reservation schema should contain
//
//      restaurant -- The name of the restaurant
//      name -- The name of the reservation (first name)
//      special_requests -- Special requests
//      date_created -- When the reservation was booked
//      date_reserved -- When the reservation is for
//      seats -- Number of seats
//      phone_number -- Contact number
//      id -- id of the reservation
//      client_id -- id of the customer

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReservationSchema = new Schema({
    restaurant: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    special_requests: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_reserved: {
        type: Date,
        default: Date.now
    },
    seats: {
        type: Number,
        require: true
    },
    contact: {
        phone_number: {
            type: Number,
            require: true
        },
    },
    id: {
        type: String,
        require: true

    },
    client_id: {
        type: mongoose.Types.ObjectId,
        require: true,
        default: mongoose.Types.ObjectId
    }
});
module.exports = mongoose.model('Reservation', ReservationSchema);