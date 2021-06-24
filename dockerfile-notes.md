#MySQL


once the init is finished for mysql
docker logs mysql1 2>&1 | grep GENERATED

ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';

OR

docker run -d --name=mysql1 -e MYSQL_ROOT_PASSWORD=’mypassword’ -v /storage/mysql1/mysql-datadir:/var/lib/mysql mysql


/docker-entrypoint-initdb.d
https://hub.docker.com/_/mysql

version: '3'
services:
    server:
        build:
            dockerfile: Dockerfile
            context: ./fortune-teller-mysql
        volumes:
            - ./fortune-teller-mysql/mysql-db-init-files:/docker-entrypoint-initdb.d
             - ./fortune-teller-mysql/mysql-db-init-files:/app
        security_opt:
        	- seccomp:unconfined



fortune-teller_database_1
docker-compose up --build

      command: bash -c "apt-get install nano"

#to allow reading from local file
SET GLOBAL local_infile = 1;
mysql --local-infile=1 -u root -p1

source /app/fortune-teller-mysql-script.sql

[mysqld]
local-infile 

[mysql]
local-infile = 1

CMD ["sh -c", "wait-for", "127.0.0.1:3306", "--", "node", "src/app.js"]
CMD ["wait-for-it.sh", "127.0.0.1:3306", "--", "node", "src/app.js"]
command: sh -c './wait-for database:3306 -- node src/app.js'

24"d x 17"w X 20"h
14 x 10

CMD ["./wait-for-it.sh" , "http://www.localhost.com:3306" , "--strict", "--timeout=300" , "--" , "node" , "src/app.js"]

curl http://localhost:8080/testing

CMD ["./wait-for-it.sh" , "http://www.localhost.com:3306" , "--strict", "--timeout=60" , "--" , "/usr/local/bin/docker-entrypoint.sh", "node" , "src/app.js"]
