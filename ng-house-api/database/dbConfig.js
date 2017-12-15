exports.host = "localhost";
exports.user = "eragonwien";
exports.password = "1212";
exports.dbname_test = "testdb";
exports.dbname = "db";
exports.sql_create_table_house = "CREATE TABLE Houses(ID int NOT NULL AUTO_INCREMENT, Price int NOT NULL DEFAULT 0,Type VARCHAR(10) NOT NULL, Address VARCHAR(20), Description VARCHAR(50) NOT NULL DEFAULT 'No description', Bathrooms int NOT NULL DEFAULT 0, Bedrooms int NOT NULL DEFAULT 0, Area int NOT NULL DEFAULT 0, Image VARCHAR(20) NOT NULL DEFAULT 'default.jpg',PRIMARY KEY(ID), CHECK (Price >= 0), CHECK (Bedrooms >= 0), CHECK (Bedrooms >= 0), CHECK (Area >= 0));";
