CREATE OR REPLACE VIEW get_houses AS
SELECT 
    house.id as id, house.user_id as user_id, house.address_id as address_id, house.house_type_id as house_type_id, 
    house.currency_id as currency_id, house.price, 
    house.rooms, house.bathrooms, house.bedrooms, house.size, house.last_update as last_update,
    role.name as role,
    currency.name as currency, currency.short as currency_short,
    house_type.name as house_type,
    user.first_name as first_name, user.last_name as last_name, user.username as username,user.password as password, user.email as email,
    address.address as address, address.postal_code as postal_code, address.city as city, address.land as land

    FROM house INNER JOIN user ON house.user_id = user.id 
    INNER JOIN address ON house.address_id = address.id 
    INNER JOIN role ON user.role_id = role.id
    INNER JOIN house_type ON house.house_type_id = house_type.id
    INNER JOIN currency ON house.currency_id = currency.id;
