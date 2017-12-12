exports.host = "localhost";
exports.user = "eragonwien";
exports.password = "1212";
exports.dbname_test = "testdb";
exports.dbname = "db";
exports.sql_create_table_house = "CREATE TABLE House (houseID int, type VARCHAR(4), address VARCHAR(20), description VARCHAR(50), detailsID int, image VARCHAR(10),PRIMARY KEY(houseID), FOREIGN KEY (detailsID) REFERENCES Details(detailsID));";
exports.sql_create_table_details = "CREATE TABLE Details (detailsID int, bathrooms int, bedrooms int, area int, PRIMARY KEY (detailsID));";
