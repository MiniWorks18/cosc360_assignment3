module.exports = {
    reservationValidator: (input) => {
        let r = input.toUpperCase();
        if (r === "BOOST" || r === "MCDONALDS" || r === "SUBWAY")
            return true
        return false
    }
}