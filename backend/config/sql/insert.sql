INSERT INTO role(name) VALUES ('User');
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
INSERT INTO tag(name) VALUES ('Garden');
INSERT INTO tag(name) VALUES ('Beach View');
INSERT INTO tag(name) VALUES ('Near Police Station');
INSERT INTO tag(name) VALUES ('Friendly Neighborhood');
INSERT INTO tag(name) VALUES ('Kindergarten');
INSERT INTO tag(name) VALUES ('Near School');
INSERT INTO tag(name) VALUES ('Near University');
INSERT INTO tag(name) VALUES ('Near Public Transport');
INSERT INTO tag(name) VALUES ('Near City Center');
INSERT INTO tag(name) VALUES ('Near Mall');

INSERT INTO land(name) VALUES('Austria');

INSERT INTO city(name, land_id) VALUES('Vienna', 1);
INSERT INTO city(name, land_id) VALUES('Lower Austria', 1);
INSERT INTO city(name, land_id) VALUES('Upper Austria', 1);
INSERT INTO city(name, land_id) VALUES('Salzburg', 1);
INSERT INTO city(name, land_id) VALUES('Tyrol', 1);
INSERT INTO city(name, land_id) VALUES('Burgenland', 1);
INSERT INTO city(name, land_id) VALUES('Styria', 1);
INSERT INTO city(name, land_id) VALUES('Carinthia', 1);

INSERT INTO postal_code(code, city_id, land_id) VALUES(1010, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1020, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1030, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1040, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1050, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1060, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1070, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1080, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1090, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1100, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1110, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1120, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1130, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1140, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1150, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1160, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1170, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1180, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1190, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1200, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1210, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1220, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1230, 1, 1);
INSERT INTO postal_code(code, city_id, land_id) VALUES(1240, 1, 1);

INSERT INTO address(street_name, house_number, postal_code_id) VALUES('Neustiftgasse', 66, 7);

INSERT INTO user(first_name, last_name, username, password, email, role_id, address_id, image_id) VALUES('Caesar', 'Salat', 'csalat', 'test', 'caesar@rome.it', 1, 1, null);
INSERT INTO house(price, rooms, bathrooms, bedrooms, size, user_id, address_id, house_type_id, house_status_id, currency_id) VALUES (10000, 5, 1, 2, 50, 1, 1, 2, 1, 1);

INSERT INTO house_tag(house_id, tag_id) VALUES (1, 2);

INSERT INTO bookmark(house_id, user_id) VALUES(1, 1);