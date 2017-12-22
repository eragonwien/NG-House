CREATE TABLE Houses (
	ID int NOT NULL AUTO_INCREMENT, 
	Price int NOT NULL DEFAULT 0,
	Type VARCHAR(10) NOT NULL, 
	Address VARCHAR(20), 
	Description VARCHAR(50) DEFAULT 'No description', 
	Bathrooms int DEFAULT 0, 
	Bedrooms int DEFAULT 0, 
	Area int DEFAULT 0, 
	Image VARCHAR(20) DEFAULT 'default.jpg',
	PRIMARY KEY(ID), 
	CHECK (Price >= 0), 
	CHECK (Bedrooms >= 0), 
	CHECK (Bedrooms >= 0), 
	CHECK (Area >= 0)
);