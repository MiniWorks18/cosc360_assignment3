module.exports = {
  "loaded test": browser => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("#browse")
      .assert.elementPresent(".col")
      .assert.containsText("h1", "Restaurants")
      .end();
  },
  "database and notification test": browser => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible(".time-button")
      .click(".time-button")
      .waitForElementVisible("#bookingForm")
      .click("#bookingFormSave")
      .waitForElementVisible("#deleteReservation")
      .click("#deleteReservation")
      .click("#reservationsClose")
      .assert.elementPresent("#notificationsBtn")
      .click("#notificationsBtn")
      .waitForElementVisible("#notificationsDropdown")
      .assert.elementPresent(".toast-body")
      .saveScreenshot("./screenshots/database_test.png")
      .end()
  }
};
