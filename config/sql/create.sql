DROP TABLE IF EXISTS offer, house, user;
DROP TABLE IF EXISTS address, role, currency, house_type, offer_status, offer_type;

CREATE TABLE IF NOT EXISTS address (
    id INT NOT NULL AUTO_INCREMENT,
    address VARCHAR(255) NOT NULL,
    postal_code VARCHAR(16) NOT NULL,
    city VARCHAR(255) NOT NULL,
    land VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT UNIQUE_Address UNIQUE(address, postal_code, city, land)
);

CREATE TABLE IF NOT EXISTS role (
    id INT NOT NULL AUTO_INCREMENT,    
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS currency (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    short VARCHAR(16) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS house_type (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS offer_status (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    role_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address_id INT NOT NULL,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),    
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (address_id) REFERENCES address(id)
);

CREATE TABLE IF NOT EXISTS house (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    house_type_id INT NOT NULL,
    bathrooms INT NOT NULL,
    bedrooms INT NOT NULL,
    size INT NOT NULL,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (house_type_id) REFERENCES house_type(id),
    CONSTRAINT CHK_rooms CHECK(bathrooms >= 0 AND bedrooms >= 0 AND size > 0)
);

CREATE TABLE IF NOT EXISTS offer (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    house_id INT NOT NULL,
    price INT NOT NULL,
    offer_status_id INT NOT NULL,
    currency_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (house_id) REFERENCES house(id),
    FOREIGN KEY (currency_id) REFERENCES currency(id),
    FOREIGN KEY (offer_status_id) REFERENCES offer_status(id)
);

INSERT INTO role(name) VALUES ('agent');
INSERT INTO role(name) VALUES ('admin');
INSERT INTO currency(name, short) VALUES ('Euro', '€');
INSERT INTO currency(name, short) VALUES ('USD', '$');
INSERT INTO offer_status(name) VALUES ('created');
INSERT INTO offer_status(name) VALUES ('offering');
INSERT INTO offer_status(name) VALUES ('sold');
INSERT INTO offer_status(name) VALUES ('canceled');
INSERT INTO offer_status(name) VALUES ('closed');
INSERT INTO house_type(name) VALUES ('house');
INSERT INTO house_type(name) VALUES ('apartment');
INSERT INTO house_type(name) VALUES ('villa');
INSERT INTO address(address, postal_code, city, land) VALUES ('Neustiftgasse 66', '1070', 'Vienna', 'Austria');
INSERT INTO user(role_id, first_name, last_name, username, password, email, address_id) VALUES(1, 'SQL', 'Man', 'Sqlman', 'test', 'sqlman@mail', 1);
INSERT INTO house(user_id, address_id, house_type_id, bathrooms, bedrooms, size) VALUES (1, 1, 1, 1, 1, 60);
INSERT INTO offer(user_id, house_id, price, offer_status_id, currency_id) VALUES (1, 1, 2000, 1, 1);