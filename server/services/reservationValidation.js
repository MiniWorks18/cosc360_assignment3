const { body } = require('express-validator');
exports.isRestaurantExist = (restaurant) => {
    // Confirm the restaurant is legitimate
    let r = restaurant.toUpperCase();
    if (r === "BOOST" || r === "MCDONALDS" || r === "SUBWAY")
        return true
    return false
}

// Validation criteria should be self-explanatory
exports.validateData = [
    body('name').trim().isLength({ min: 3 }).
        withMessage('name must be at least 3 chars long'),

    body('name').trim().isAlpha(['en-US']).
        withMessage('name must be alphabetical characters'),

    body('restaurant').trim().isLength({ min: 3 }).
        withMessage('restaurant must be at least 3 chars long'),

    body('phone_number').trim().isMobilePhone(['en-AU']).
        withMessage('phone number format invalid'),

    body('seats').trim().isInt({ min: 1 }).
        withMessage('number of seats must be greater than 0'),

    // body('date_reserved').isDate().
    //     withMessage('invalid date format'),

    // body('date_reserved').isAfter().
    //     withMessage("reservation must be at a future date")

]