var fs = require('fs');
var readline = require('readline-sync');
var db = require('../config/db');
const sqlCreatePath = './config/sql/create.sql';
const tablesList = ['address', 'currency', 'house', 'role', 'house_type', 'user'];

var pool = db.pool;
var pool_no_database = db.pool_no_database;

exports.start = start;
function start() {
    createDatabase(checkTables);
}

function createDatabase(next) {
    var database = (process.env.NODE_ENV == 'production') ? process.env.DB_PRODUCTION : process.env.DB_TEST;
    var cmd = 'CREATE DATABASE IF NOT EXISTS ' + database + ';';
    pool_no_database.query(cmd, null, function (error, result) {
        if (error) {
            return close(error);
        }
        next(database);
    })
}

function checkTables(database) {
    console.log('Checking if the required tables exist in the current database')
    var cmd = 'SHOW TABLES;';
    pool.query(cmd, null, function (error, result) {
        if (error) {
            return close(error);
        }
        result = transformShowTableResultToList(result, database);
        if (doesContainerHasArray(result, tablesList)) {
            console.log('Tables already exist.');
            if (readline.keyInYN('Do you want to clean all entries in these tables ?')) {
                return createTables();
            }
            return finish();
        }
        console.log('Tables are missing. Process on creating tables on existing database.')
        createTables();
    })
}

function createTables() {
    console.log('Creating tables.');
    var sql = fs.readFileSync(sqlCreatePath);
    sql = sql.toString();
    pool.query(sql, null, function (error, result) {
        if (error) {
            return close(error);
        }
        console.log('Tables successfully created.');
        finish();
    })
}

function close(error) {
    if (error) {
        console.log(error);
    }
    process.exit();
}

function finish() {
    close('Setup finished.');
}

exports.doesContainerHasArray = doesContainerHasArray;
function doesContainerHasArray(container, array) {
    if (container.length < array.length) {
        return false;
    }
    for (let x = 0; x < array.length; x++) {
        var found = false;
        for (let y = 0; y < container.length; y++) {
            if (container[y] == array[x]) {
                found = true;
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}

function transformShowTableResultToList(result, database) {
    list = [];
    var key = 'Tables_in_' + database;
    result.forEach(element => {
        list.push(element[key]);
    });
    return list;
}