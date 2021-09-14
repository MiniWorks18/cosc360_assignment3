# COSC360 - Assignment 3
Some code in this project is inspired by the practicals of COSC360

## About
This project is designed to meet the assignment criteria of COSC360 Assignment 3. 
It's a full stack MEAN environment of a restaurant reservation booking website.
It's designed to allowed arbitrary restaurants to display on the home page,
where the user can also browse a specific restaurant and book for a table.

## Author
Tully McDonald
tmcdon26@myune.edu.au

## How to use

- Install [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/) on your machine.
- In the terminal, run the command `docker-compose up -d` or `docker compose up -d` in the `dropbeartable` directory.
- Server-side: visit [http://localhost:3000](http://localhost:3000)
- Documentation: visit [http://localhost:3000/docs] (http://localhost:3000/docs)
- MongoDB: visit [http://localhost:8081](http://localhost:8081), you should see the mongo-express admin panel, where you can manage your MongoDB.
- Client-side: visit [http://localhost:8080](http://localhost:8080)
- Restaurant data is hard coded for simplicity of the assignment marking, as opposed to importing into the database first
- Select a restaurant to view available times
- Select a time and book the restaurant
- Manage reservations in the reservations tab
- Notifications will appear in the notifications drop down

## How to shut down the app

Important: the command will remove all unused volumes, including the named volume, which contains all of your data. You should follow the steps to back up your data beforehand.

- To back up the data:
	- visit [http://localhost:8081](http://localhost:8081)
	- select your database and export the data
	- Important: submit your assignments 2 and 3 with the exported data!
- Run the command `docker-compose down -v` to stop the running containers and remove the volumes.

## Testing
A few basic tests have been included in the source code
- `npm run test:e2e`
	- "loaded test" tests to make sure the restaurants components load
	- "database and notification test" tests to make sure a reservation is acknowledged by the server and then that a notification is sent back to the client
