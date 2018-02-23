DROP TABLE IF EXISTS address, status, role, currency, type;
DROP TABLE IF EXISTS offer, house, user;

CREATE TABLE IF NOT EXISTS address (
    id INT NOT NULL AUTO_INCREMENT,
    address VARCHAR(255) NOT NULL,
    postal_code VARCHAR(16) NOT NULL,
    city VARCHAR(255) NOT NULL,
    land VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT UNIQUE_Address UNIQUE(address, postal_code, city, land)
);

CREATE TABLE IF NOT EXISTS status (
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(name)
);

CREATE TABLE IF NOT EXISTS role (
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(name)
);

CREATE TABLE IF NOT EXISTS currency (
    name VARCHAR(255) NOT NULL,
    short VARCHAR(16) NOT NULL UNIQUE,
    PRIMARY KEY(name)
);

CREATE TABLE IF NOT EXISTS type (
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(name)
);

CREATE TABLE IF NOT EXISTS offer_status (
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(name)
);

CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(255) NOT NULL,
    status_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),    
    FOREIGN KEY (role_name) REFERENCES role(name),
    FOREIGN KEY (status_name) REFERENCES status(name)
);

CREATE TABLE IF NOT EXISTS house (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    type_name VARCHAR(255) NOT NULL,
    bathrooms INT NOT NULL,
    bedrooms INT NOT NULL,
    size INT NOT NULL,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (type_name) REFERENCES type(name),
    CONSTRAINT CHK_rooms CHECK(bathrooms >= 0 AND bedrooms >= 0 AND size > 0)
);

CREATE TABLE IF NOT EXISTS offer (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    house_id INT NOT NULL,
    price INT NOT NULL,
    currency_name VARCHAR(255) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    offer_status_name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (house_id) REFERENCES house(id),
    FOREIGN KEY (currency_name) REFERENCES currency(name),
    FOREIGN KEY (offer_status_name) REFERENCES offer_status(name)
);

