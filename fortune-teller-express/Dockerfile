FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && apt-get -q update && apt-get -y install netcat 
COPY . .
RUN chmod +x wait-for-it.sh
EXPOSE 8080
CMD ["./wait-for-it.sh" , "mysql_db:3306" , "--strict", "--timeout=120", "--" , "node" , "src/app.js"]