CREATE OR REPLACE VIEW get_houses AS
SELECT 
	house.id AS id, house.price AS price, house.rooms AS rooms, house.bathrooms AS bathrooms, house.bedrooms AS bedrooms, house.size AS size,
    house.user_id as user_id, house.address_id as address_id, house.house_type_id as house_type_id, house.house_status_id as house_status_id, house.currency_id as currency_id,
    user.first_name as first_name, user.last_name as last_name, user.email as email, user.username as username,
    address.address as address, address.postal_code as postal_code, address.city as city, address.land as land,
    house_type.name as house_type, house_status.name as house_status, currency.name as currency, currency.short as currency_short,
    house.last_update as last_update
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

CREATE OR REPLACE VIEW get_bookmarks AS
select 
	bookmark.id as id,
	bookmark.user_id as bookmarker_id,
	house.price as price, house.rooms as rooms, house.bathrooms as bathrooms, house.bedrooms as bedrooms, house.size as size, house.id as house_id,
    currency.name as currency, currency.id as currency_id,
	address.address as address, address.city as city, address.land as land, address.id as address_id,
	house_type.name as house_type, house_type.id as house_type_id, 
    house_status.name as house_status, house_status.id as house_status_id,
    user.first_name as owner_first_name, user.last_name as owner_last_name,
	user.username as owner_username, user.email as owner_email, user.id as owner_id 

from 
	bookmark
	inner join house on house.id = bookmark.house_id
	inner join user on house.user_id = user.id
	inner join currency on house.currency_id = currency.id
	inner join address on house.address_id = address.id
	inner join house_type on house.house_type_id = house_type.id
	inner join house_status on house.house_status_id = house_status.id;

select * from get_bookmarks;
