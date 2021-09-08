Application Programming Interface (API)
# Author: Tully McDonald (starter code provided by 
# The University of New England)
# Contact: tmcdon26@myune.edu.au


This program is designed to be used as a restaurant reservations handler.
Allowing for:
* Creating reservations that hold parameters such as:
    - restaurant -- name of restaurant
    - name -- name on reservation (first name)
    - special_requests -- any special requests like no nuts etc
    - date_reserved -- the date the reservation has been made for
    - seats -- the number of seats for the reservation
    - phone_number -- the number of the person who made the reservation
    - client_id -- the id of the client who has made this reservation 
        (allows for accounts and multiple bookings)
    Additional parameters:
    - id -- id of the reservation
    - date_created -- when the reservation was booked
* Deleting reservations
* Updating reservations
* Fetch/get reservations


How to use:
* Begin by running a docker container on this directory:
    docker compose up --build -d

* Make sure MongoDB community edition is installed
* Open URL: localhost:3000
* You should see a json file printed on the browser saying "Hello, World!"
* This means the program is running and ready to begin taking requests
* Open localhost:3000/docs for instructions on how to make requests
* NOTE: No pre-prepared data is required


Example requests:
A few examples of how to interact with the program have been provided below.
Additionally, there's a Swagger documentation page locally hosted to help
with using the program (localhost:3000/docs)

*** Make a reservation with required parameters ***
curl --location --request POST 'http://localhost:3000/reservations/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "restaurant": "mcdonalds",
    "name":"Stnnn",
    "phone_number": "0499999990",
    "seats": 3,
    "date_reserved": "2021-08-07"
}'

*** Delete reservation by ID ***
curl --location --request DELETE 'http://localhost:3000/reservations/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id":"610cfb0ffd9b100392ac1c3f"
}'

*** Get reservation by ID ***
curl --location --request GET 'http://localhost:3000/reservations/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id":"610cfd00fd9b100392ac1c44"
}'

*** Get ALL reservations ***
curl --location --request GET 'http://localhost:3000/reservations/' \
--header 'Content-Type: application/json' \
--data-raw '{
    
}'

*** Update reservation by ID ***
curl --location --request PUT 'http://localhost:3000/reservations/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "restaurant": "mcdonalds",
    "name":"Steve",
    "phone_number": "0499999990",
    "seats": 3,
    "date_reserved": "2021-08-07",
    "id":"610cfd00fd9b100392ac1c44"
}'

*** Connect to the notifications endpoint ***
To do this, open localhost:8080, then enter this into the dev console
    const url = 'http://localhost:3000/reservations/notification'
    const sse = new EventSource(url)
    sse.addEventListener("reservationAdded", (e) => {
    console.log('reservationAdded')
    console.log(e.data)
    })
    sse.addEventListener("message", (e) => {
    console.log('MESSAGE')
    console.log(e.data)
    })

Test the program by running the following command inside the /server directory:
    npm run test