INSERT INTO role(name) VALUES ('Agent');
INSERT INTO role(name) VALUES ('Admin');

INSERT INTO currency(name, short) VALUES ('EUR', '€');
INSERT INTO currency(name, short) VALUES ('USD', '$');

INSERT INTO house_type(name) VALUES ('House');
INSERT INTO house_type(name) VALUES ('Apartment');
INSERT INTO house_type(name) VALUES ('Villa');

INSERT INTO house_status(name) VALUES ('Active');
INSERT INTO house_status(name) VALUES ('Inactive');

INSERT INTO tag(name) VALUES ('Small');
INSERT INTO tag(name) VALUES ('Medium');
INSERT INTO tag(name) VALUES ('Large');

INSERT INTO address(address, postal_code, city, land) VALUES('Neustiftgasse', 1070, 'Vienna', 'Austria');
INSERT INTO user(first_name, last_name, username, password, email, role_id, address_id, image_id) VALUES('Caesar', 'Salat', 'csalat', 'test', 'caesar@rome.it', 1, 1, null);
INSERT INTO house(price, rooms, bathrooms, bedrooms, size, user_id, address_id, house_type_id, house_status_id, currency_id) VALUES (10000, 5, 1, 2, 50, 1, 1, 2, 1, 1);

INSERT INTO house_tag(house_id, tag_id) VALUES (1, 2);