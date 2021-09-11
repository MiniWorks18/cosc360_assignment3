const Reservation = require('../models/reservation')
const { validationResult } = require('express-validator')
const reservation = require('../models/reservation')
const mongoose = require('mongoose')
const { isRestaurantExist } = require('../services/reservationValidation')
const chatty = require('../services/status')

let clients = [];
const sendEvents = (newReservation) => {
    clients.forEach(client => client.res
        .write(`event: reservationAdded\ndata: ${JSON.stringify(newReservation)}\n\n`))
}

// Notification endpoint, sends updates to clients
exports.reservationAddedNotification = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    console.log(res)
    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
    clients.push(newClient);
    // clients.forEach(client => client.res.write("Hi"))
    res.on('close', () => console.log(`connection closed!`));
}

// Create reservation
exports.create_reservation = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        if (!isRestaurantExist(req.body.restaurant)) {
            let err = {
                "restaurant": req.body.restaurant,
                "msg": "restaurant does not exist",
                "param": "restaurant",
                "location": "body"
            }
            return res.status(400).json({ errors: [err] })
        }
        // Capture all reservation details
        let reservation = new Reservation({
            restaurant: req.body.restaurant,
            name: req.body.name,
            date_reserved: req.body.date_reserved,
            seats: req.body.seats,
            contact: { phone_number: req.body.phone_number },
            special_requests: req.body.special_requests,
            client_id: req.body.client_id

        });
        // Checks if a reservation of this name or date or restaurant has 
        // already been made
        let found_reservation = await Reservation.findOne({
            'name': req.body.name,
            'date_reserved': req.body.date_reserved,
            'restaurant': req.body.restaurant
        }).exec();
        // Create a new item only if it is not in DB
        if (found_reservation) {
            let err = {
                "restaurant": reservation.restaurant,
                "msg": "reservation already exists",
                "param": "restaurant",
                "location": "body"
            }
            return res.status(400).json({ errors: [err] })
        } else {
            let output_reservation = await reservation.save();
            let response = {
                "msg": "Successfully created reservation",
                "item": output_reservation
            }
            if (output_reservation) {
                /// Up to here, going to implement a notifications system using websockets
                res.status(201).json(response)
                return sendEvents(response)
            }
            // In case, something went wrong
            res.status(400).json({ errors: [err] })
        }
    } catch (err) {
        res.status(400).json({ errors: [err] })
        return sendEvents({ errors: [err] })
    }
};

// Delete reservations from the database
exports.delete_reservation = async (req, res) => {
    try {
        let del_reservation = await Reservation.findOneAndDelete({
            // Prefer to use id, use name for testing
            '_id': req.body._id
            // 'name': req.body.name
        }).exec();
        if (del_reservation) {
            let response = {
                "msg": "Successfully deleted",
                "item": del_reservation
            }
            res.status(200).json(response)
            return sendEvents(response)
        } else {
            // Reservation does not exist
            let err = {
                "_id": req.body._id,
                "msg": "id does not match existing reservations",
                "param": "_id",
                "location": "body"
            }
            res.status(404).json({ errors: [err] })
        }
    } catch (err) {
        res.status(400).json({ errors: [err] })
        return sendEvents({ errors: [err] })
    }
}

// Update reservations in the database
exports.update_reservation = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        if (!isRestaurantExist(req.body.restaurant)) {
            let err = {
                "restaurant": req.body.restaurant,
                "msg": "restaurant does not exist",
                "param": "restaurant",
                "location": "body"
            }
            return res.status(400).json({ errors: [err] })
        }
        let upd_reservation = await Reservation.findOneAndUpdate({
            // Prefer to use id, use name for testing
            '_id': req.body._id
            // 'name': req.body.name
        },
            {
                'name': req.body.name,
                'restaurant': req.body.restaurant,
                'seats': req.body.seats,
                'contact': {
                    'phone_number': req.body.phone_number
                }
            }).exec();

        if (upd_reservation) {
            let response = {
                "msg": "Successfully updated",
                "item": upd_reservation
            }
            res.status(200).json(response);
            return sendEvents(response);
        } else {
            // Reservation does not exist
            let err = {
                "id": req.body.id,
                "restaurant": req.body.restaurant,
                "data_reserved": req.body.date_reserved,
                "msg": "id does not match existing reservations",
                "param": "id",
                "location": "body"
            }
            res.status(400).json({ errors: [err] })
        }
    } catch (err) {
        res.status(400).json({ errors: [err] })
        return sendEvents({ errors: [err] })
    }
}

// Get reservation by ID
exports.get_reservation = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    try {
        let gt_reservation = await Reservation.findOne({
            // Prefer to use id, use name for testing
            '_id': req.body.id
            // ,'name': req.body.name
        }).exec();
        if (gt_reservation) {
            console.log(gt_reservation.time.format('hh:mm'))
            res.status(200).json(gt_reservation)
        } else {
            let gt_reservations = await Reservation.find({});
            if (gt_reservations.length > 0) {
                res.status(200).json({
                    "msg": "id does not match existing reservations",
                    "all_reservations": gt_reservations
                })
            } else {
                let err = {
                    "msg": "Something went wrong, or the database is empty"
                }
                res.status(404).json({ errors: [err] })
            }
        }
    } catch (err) {
        res.status(400).json({ errors: [err] })
        return sendEvents({ errors: [err] })
    }
}