FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm install && apt-get -q update && apt-get -y install netcat
RUN chmod +x `ls *.sh`
CMD ["./wait-for-it.sh" , "express_server:8080" , "--strict", "--timeout=60", "--", "./startup-script.sh"]