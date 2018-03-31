# get addresses

CREATE OR REPLACE VIEW get_addresses AS
SELECT
	address.id AS id, address.street_name AS street_name, address.house_number as house_number,
    postal_code.id as postal_code_id, postal_code.code as postal_code_code, postal_code.name as postal_code_name,
    city.id as city_id, city.name as city_name,
    land.id as land_id, land.name as land_name
FROM
address
	INNER JOIN postal_code ON address.postal_code_id = postal_code.id
    INNER JOIN city ON postal_code.city_id = city.id
    INNER JOIN land on city.land_id = land.id;

select * from get_addresses;

# get users

CREATE OR REPLACE VIEW get_users AS
SELECT 
	user.id, user.first_name, user.last_name, user.username, user.password, user.email, user.last_update,
    get_addresses.id as address_id, get_addresses.street_name as street_name, get_addresses.house_number as house_number, 
    get_addresses.postal_code_code as postal_code, get_addresses.city_name as city, get_addresses.land_name as land,
    role.id as role_id, role.name as role
FROM
	user
    INNER JOIN role ON user.role_id = role.id
    INNER JOIN get_addresses ON user.address_id = get_addresses.id;
    
select * from get_users;

# get houses

CREATE OR REPLACE VIEW get_houses AS
SELECT 
	house.id AS id, house.price AS price, house.rooms AS rooms, house.bathrooms AS bathrooms, house.bedrooms AS bedrooms, house.size AS size, 
    house.last_update as last_update,
    house.house_type_id as house_type_id, house.house_status_id as house_status_id, house.currency_id as currency_id,
    user.id as user_id, user.first_name as first_name, user.last_name as last_name, user.email as email, user.username as username,
    get_addresses.id as address_id, get_addresses.street_name as street_name, get_addresses.house_number as house_number, 
    get_addresses.postal_code_code as postal_code, get_addresses.city_name as city, get_addresses.land_name as land,
    house_type.name as house_type, house_status.name as house_status, currency.name as currency, currency.short as currency_short
FROM
	house
    INNER JOIN user ON house.user_id = user.id
    INNER JOIN get_addresses ON house.address_id = get_addresses.id
    INNER JOIN house_type ON house.house_type_id = house_type.id
    INNER JOIN house_status ON house.house_status_id = house_status.id
    INNER JOIN currency ON house.currency_id = currency.id;
    
SELECT * FROM get_houses;

# get tags

CREATE OR REPLACE VIEW get_tags AS 
SELECT house_tag.house_id, tag.name
FROM 
	house_tag
    INNER JOIN tag ON house_tag.tag_id = tag.id;
    
select * from get_tags;

# get bookmarks

CREATE OR REPLACE VIEW get_bookmarks AS
select 
	bookmark.id as id,
	bookmark.user_id as bookmarker_id, user.first_name as owner_first_name, user.last_name as owner_last_name, user.username as owner_username, user.email as owner_email, user.id as owner_id,
	house.id as house_id, house.price as price, house.rooms as rooms, house.bathrooms as bathrooms, house.bedrooms as bedrooms, house.size as size, 
    currency.id as currency_id, currency.name as currency, 
	get_addresses.id as address_id, get_addresses.street_name as street_name, get_addresses.house_number as house_number, 
    get_addresses.postal_code_code as postal_code, get_addresses.city_name as city, get_addresses.land_name as land,
	house_type.id as house_type_id, house_type.name as house_type, 
    house_status.id as house_status_id, house_status.name as house_status
    
from 
	bookmark
	inner join house on house.id = bookmark.house_id
	inner join user on house.user_id = user.id
	inner join currency on house.currency_id = currency.id
	INNER JOIN get_addresses ON house.address_id = get_addresses.id
	inner join house_type on house.house_type_id = house_type.id
	inner join house_status on house.house_status_id = house_status.id;

select * from get_bookmarks;

