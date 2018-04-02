let pool = require('../../config/db').pool;

/**
 * create house tag
 * @param {object} house_tag house tag
 * @param {callback} done callback
 */
function createHouseTag (house_tag, done) {
    let cmd = 'INSERT INTO house_tag(tag_id, house_id) VALUES(?, ?) ';
    cmd += 'ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);';
    let params = [house_tag.tag_id, house_tag.house_id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * get house tags
 * @param {number} count query limit
 * @param {callback} done callback
 */
function getHouseTags (count, done) {
    count = count ? count : 1000;
    let cmd = 'SELECT * FROM get_tags LIMIT ' + count + ';';
    let params = null;
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * get house tag by id
 * @param {number} id house tag id
 * @param {callback} done callback
 */
function getHouseTagById (id, done) {
    let cmd = 'SELECT * FROM get_tags WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result[0]);
    });
}

/**
 * get house tag by id
 * @param {number} house_id house id
 * @param {callback} done callback
 */
function getHouseTagByHouse (house_id, done) {
    let cmd = 'SELECT * FROM get_tags WHERE house_id=?;';
    let params = [house_id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * update house tag by id
 * @param {number} id house tag id
 * @param {object} house_tag updated house tag
 * @param {callback} done callback
 */
function updateHouseTagById (id, house_tag, done) {
    let cmd = 'UPDATE house_tag SET tag_id=?, house_id=? WHERE id=?';
    let params = [house_tag.tag_id, house_tag.house_id, id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

/**
 * delete house tag by id
 * @param {number} id house tag id
 * @param {callback} done callback
 */
function deleteHouseTagById (id, done) {
    let cmd = 'DELETE FROM house_tag WHERE id=? LIMIT 1;';
    let params = [id];
    pool.query(cmd, params, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}

module.exports = {createHouseTag, getHouseTags, getHouseTagById, getHouseTagByHouse, updateHouseTagById, deleteHouseTagById};