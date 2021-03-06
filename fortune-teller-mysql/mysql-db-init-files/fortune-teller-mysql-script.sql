CREATE DATABASE fortune_teller;

USE fortune_teller;

CREATE TABLE fortunes(
	message_id INT PRIMARY KEY,
    quote VARCHAR(500) NOT NULL,
    topic VARCHAR(25) NOT NULL
);

/* LOAD DATA LOCAL INFILE './app/fortunes.txt'  INTO TABLE fortunes; */
/*LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/fortunes.txt'  INTO TABLE fortunes;*/
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/fortunes.csv' INTO TABLE fortunes COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n';
CREATE USER 'ft_express_db_connect'@'fortune-teller_express_server_1.fortune-teller_default' IDENTIFIED WITH mysql_native_password BY 'tacosandburritos';
CREATE USER 'datadog'@'datadog-agent-ft.fortune-teller_default' IDENTIFIED WITH mysql_native_password BY 'tacosandburritos';
GRANT SELECT ON fortune_teller.fortunes to 'ft_express_db_connect'@'fortune-teller_express_server_1.fortune-teller_default';
GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'datadog-agent-ft.fortune-teller_default';
ALTER USER 'datadog'@'datadog-agent-ft.fortune-teller_default' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO 'datadog'@'datadog-agent-ft.fortune-teller_default';

