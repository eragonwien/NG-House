CREATE OR REPLACE VIEW get_houses AS
SELECT 
	house.id AS id, house.price AS price, house.rooms AS rooms, house.bathrooms AS bathrooms, house.bedrooms AS bedrooms, house.size AS size,
    house.user_id as user_id, house.address_id as address_id, house.house_type_id as house_type_id, house.house_status_id as house_status_id, house.currency_id as currency_id,
    user.first_name as first_name, user.last_name as last_name, user.email as email, user.username as username,
    address.address as address, address.postal_code as postal_code, address.city as city, address.land as land,
    house_type.name as house_type, house_status.name as house_status, currency.name as currency, currency.short as currency_short
FROM
	house
    INNER JOIN user ON house.user_id = user.id
    INNER JOIN address ON house.address_id = address.id
    INNER JOIN house_type ON house.house_type_id = house_type.id
    INNER JOIN house_status ON house.house_status_id = house_status.id
    INNER JOIN currency ON house.currency_id = currency.id;
    
SELECT * FROM get_houses;

CREATE OR REPLACE VIEW get_users AS
SELECT 
	user.id, user.address_id, user.role_id,
	user.first_name, user.last_name, user.username, user.password, user.email, user.last_update,
    address.address as address, address.postal_code as postal_code, address.city as city, address.land as land,
    role.name as role
FROM
	user
    INNER JOIN role ON user.role_id = role.id
    INNER JOIN address ON user.address_id = address.id;
    
select * from get_users where id=1;

CREATE OR REPLACE VIEW get_tags AS 
SELECT house_tag.house_id, tag.name
FROM 
	house_tag
    INNER JOIN tag ON house_tag.tag_id = tag.id;
    
select * from get_tags;