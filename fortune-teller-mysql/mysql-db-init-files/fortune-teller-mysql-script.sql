CREATE DATABASE fortune_teller;

USE fortune_teller;

CREATE TABLE fortunes(
    quote VARCHAR(500) NOT NULL,
    topic VARCHAR(25) NOT NULL
);

/* LOAD DATA LOCAL INFILE './app/fortunes.txt'  INTO TABLE fortunes; */
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/fortunes.txt'  INTO TABLE fortunes;
CREATE USER 'ft_express_db_connect'@'fortune-teller_express_server_1.fortune-teller_default' IDENTIFIED WITH mysql_native_password BY 'tacosandburritos';
GRANT SELECT ON fortune_teller.fortunes to 'ft_express_db_connect'@'fortune-teller_express_server_1.fortune-teller_default';

