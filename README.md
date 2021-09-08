# How to use the starter code

- Install [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/) on your machine.
- In the terminal, run the command `docker-compose up -d` or `docker compose up -d` in the `dropbeartable` directory.
- Server-side: visit [http://localhost:3000](http://localhost:3000), you should see the JSON message `{message: 'Hello World!'}`.
- MongoDB: visit [http://localhost:8081](http://localhost:8081), you should see the mongo-express admin panel, where you can manage your MongoDB.
- Client-side: visit [http://localhost:8080](http://localhost:8080), you should see the Vue logo and `Welcome to Your Vue.js App`.
- Now, you are ready to write your own code!

# How to shut down the app

Important: the command will remove all unused volumes, including the named volume `dropbeartable_mongodb`, which contains all of your data. You should follow the steps to back up your data beforehand.

- To back up the data:
	- visit [http://localhost:8081](http://localhost:8081)
	- select your database and export the data
	- Important: submit your assignments 2 and 3 with the exported data!
- Run the command `docker-compose down -v` to stop the running containers and remove the volumes.

