DROP TABLE IF EXISTS bookmark, house_image, house_tag, house, user, image, tag, house_status, house_type, currency, role, address, postal_code, city, land;

CREATE TABLE IF NOT EXISTS land (
    id INT NOT NULL AUTO_INCREMENT,    
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS city (
    id INT NOT NULL AUTO_INCREMENT,    
    name VARCHAR(255) NOT NULL,
    land_id INT NOT NULL,
    FOREIGN KEY (land_id) REFERENCES land(id),
    CONSTRAINT UNIQUE_land_city UNIQUE(name, land_id),
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS postal_code (
    id INT NOT NULL AUTO_INCREMENT,    
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    city_id INT NOT NULL,
    land_id INT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES city(id),
    FOREIGN KEY (land_id) REFERENCES land(id),
    CONSTRAINT UNIQUE_city_code UNIQUE(code, city_id, land_id),
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS address (
    id INT NOT NULL AUTO_INCREMENT,
    street_name VARCHAR(255) NOT NULL,
    house_number INT NOT NULL,
    postal_code_id INT NOT NULL,
    FOREIGN KEY (postal_code_id) REFERENCES postal_code(id),
    CONSTRAINT UNIQUE_Address UNIQUE(street_name, house_number, postal_code_id),
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS role (
    id INT NOT NULL AUTO_INCREMENT,    
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS currency (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    short VARCHAR(16) NOT NULL UNIQUE,
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS house_type (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS house_status (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS tag (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS image (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INT NOT NULL,
    address_id INT NOT NULL,
    image_id INT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (image_id) REFERENCES image(id),
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS house (
    id INT NOT NULL AUTO_INCREMENT,
    price INT NOT NULL,
    rooms INT NOT NULL,
    bathrooms INT NOT NULL,
    bedrooms INT NOT NULL,
    size INT NOT NULL,
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    house_type_id INT NOT NULL,
    house_status_id INT NOT NULL,
    currency_id INT NOT NULL,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (house_type_id) REFERENCES house_type(id),
	FOREIGN KEY (house_status_id) REFERENCES house_status(id),
    FOREIGN KEY (currency_id) REFERENCES currency(id),
    CONSTRAINT CHK_rooms CHECK(bathrooms >= 0 AND bedrooms >= 0 AND size > 0 AND rooms > (bathrooms + bedrooms)),
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS house_tag (
    id INT NOT NULL AUTO_INCREMENT,
    tag_id INT NOT NULL,
    house_id INT NOT NULL,
    FOREIGN KEY (tag_id) REFERENCES tag(id),
    FOREIGN KEY (house_id) REFERENCES house(id),
    CONSTRAINT uq_book_house UNIQUE(tag_id, house_id),
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS house_image (
    id INT NOT NULL AUTO_INCREMENT,
    image_id INT NOT NULL,
    house_id INT NOT NULL,
    FOREIGN KEY (image_id) REFERENCES image(id),
    FOREIGN KEY (house_id) REFERENCES house(id),
    PRIMARY KEY(id)
) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS bookmark (
    id INT NOT NULL AUTO_INCREMENT,
    house_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (house_id) REFERENCES house(id),
    CONSTRAINT uq_book_house UNIQUE(user_id, house_id),
    PRIMARY KEY(id)
) CHARACTER SET utf8;