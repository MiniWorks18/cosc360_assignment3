const { reservationValidator } = require('../validator');

test('Confirm correct restaurants are accepted', () => {
    expect(reservationValidator("mcdonalds")).toEqual(true);
})

test('Confirm invalid restaurants are not accepted', () => {
    expect(reservationValidator("mcdonald")).toEqual(false)
})