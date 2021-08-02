# Fortune Teller

Docker + Express + Angular + MySQL
---
This sandbox serves a fortune telling web application based on Zoltar Speaks from the timeless Tom Hanks film [Big](https://www.youtube.com/watch?v=Q6RK4479XD8).  Thus we have ***ZoltBits Speaks*** who will tell all of your Datadog fortunes!  And by "fortunes" I mean small pieces of info related to either Logs, Agent, or Synthetics that I have scraped from our docs.

The front end is built with Angular and is served using an Angular development server, the back end is a simple Express (NodeJS) server, and the database being used is MySQL.  I have used a ```docker-compose``` file to define and run the application containers.  

The Express and Angular services are built from a Dockerfile that you can see within the service's directory (i.e. ```fortune-teller-express/Dockerfile```).  The MySQL service is built directly from the ```mysql:8.0.20``` image, then the database is initialized from a startup SQL script ```fortune-teller/fortune-teller-mysql/mysql-db-init-files/fortune-teller-mysql-script.sql```.  The Datadog Agent service is built directly from the latest [Agent image](https://docs.datadoghq.com/agent/docker/?tab=standard) (```datadog/agent:latest```) with all necessary initialization settings provided directly in the ```docker-compose``` file via environment variables and volume mounts.

Once the application is spun up, you be able to see the related logs, traces, and RUM data being sent to your Datadog account.  You can also install the [MySQL integration](https://app.datadoghq.com/account/settings) in your account, as the agent will autodiscover the MySQL database through the container labels.

*Prerequisites:* You must have Docker installed to your machine- you can verify this by running ```docker --version```.  If you need to install Docker, you can do so by following [this link](https://docs.docker.com/get-docker/).  Then, clone this repository or download the ```fortune-teller``` folder to your machine

## Sections
- Step 1: Create a RUM Application in your Datadog account
- Step 2: Configure ENV file with your Datadog Agent API key, Datadog RUM App ID, and Datadog RUM Client Token
- Step 3: Spin up the Docker containers
- Step 4: Generate some of that sweet sweet data
- Step 5: View the data in your Datadog account
- Step 6: Shut it down!
- Docker tips to manage your local memory
---

### Step 1.  Create a RUM Application in your Datadog account

Create a new application in your Datadog account by following [this link](https://app.datadoghq.com/rum/application/create), name the application ```fortune-teller``` and select ```Generate Client Token```.  The ```init``` block will contain your ```clientToken``` and ```applicationId```.  Copy these two strings and keep them handy, as you will need them for Step 2.

### Step 2.  Configure ENV file with your Datadog Agent API key, Datadog RUM App ID, and Datadog RUM Client Token

In your ```~``` directory, create a file called ```sandbox.docker.env``` that contains:
```
DD_API_KEY=<YOUR_API_KEY>
DD_FT_APP_ID=<YOUR_APP_ID>
DD_FT_CLIENT_TOKEN=<YOUR_CLIENT_TOKEN>
```

### Step 3.  Spin up the Docker containers

i. Build the images using the following command: ```docker-compose build```.  *Note:* This may take awhile if it is your first time running ```fortune-teller```.
ii. Spin up the containers using the following command: ```docker-compose up```

### Step 4. Generate some of that sweet sweet data

Verify the app has been fully initialized... You can then navigate to localhost:4200 on your favorite web browser and start interacting with ```fortune-teller```.  Click on the topic buttons on the top toolbar of the screen to receive a fortune, or click the error codes to generate an error.

### Step 5. View the data in your Datadog account

Go to your [Logs Search](https://app.datadoghq.com/logs) view to see the app-generated logs in your Datadog account.  Check out the [live traces](https://app.datadoghq.com/apm/traces?query=env%3Anone&streamTraces=true&start=1627914977012&end=1627915877012&paused=false) coming in as you interact with the page, and view your RUM data by clicking into the ```fortune-teller``` application from your [RUM Applications page](https://app.datadoghq.com/rum/list?from_ts=1627829489327&to_ts=1627915889327&live=true).

### Step 6.  Shut it down!

If you are still in the same terminal you have initialized the app from, you can use ```Ctrl + C``` to stop the containers, then run ```docker-compose down``` to remove the containers and the network.  If you are in a different terminal, you can simply run ```docker-compose down``` to both stop the application and remove the containers/network.

### Docker tips to manage your local memory

Some commands to clear out unsused image layers, containers and volumes from your local machine:
```docker rm $(docker ps -f status=exited -aq)
docker rmi $(docker images -f "dangling=true" -q)
docker volume rm $(docker volume ls -qf dangling=true)```


