DROP TABLE IF EXISTS offer, house, user;
DROP TABLE IF EXISTS address, role, currency, house_type;

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
    currency_id INT NOT NULL,
    price INT NOT NULL,
    rooms INT NOT NULL,
    bathrooms INT NOT NULL,
    bedrooms INT NOT NULL,
    size INT NOT NULL,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (house_type_id) REFERENCES house_type(id),
    FOREIGN KEY (currency_id) REFERENCES currency(id),
    CONSTRAINT CHK_rooms CHECK(bathrooms >= 0 AND bedrooms >= 0 AND size > 0 AND rooms > (bathrooms + bedrooms))
);

INSERT INTO role(name) VALUES ('agent');
INSERT INTO role(name) VALUES ('admin');
INSERT INTO currency(name, short) VALUES ('EUR', '€');
INSERT INTO currency(name, short) VALUES ('USD', '$');
INSERT INTO house_type(name) VALUES ('House');
INSERT INTO house_type(name) VALUES ('Apartment');
INSERT INTO house_type(name) VALUES ('Villa');
INSERT INTO address(address, postal_code, city, land) VALUES ('Neustiftgasse 66', '1070', 'Vienna', 'Austria');
INSERT INTO user(role_id, first_name, last_name, username, password, email, address_id) VALUES(1, 'SQL', 'Man', 'sqlman', 'test', 'sqlman@mail', 1);
INSERT INTO house(user_id, address_id, house_type_id, price, currency_id, rooms, bathrooms, bedrooms, size) VALUES (1, 1, 1, 2000, 1, 5, 1, 1, 60);
