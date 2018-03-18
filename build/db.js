var fs = require('fs');
require('dotenv').config();
var readline = require('readline-sync');
var db = require('../backend/config/db');
var helper = require('./helper');
const sqlCreatePath = './backend/config/sql/create.sql';
const tablesList = ['address', 'currency', 'house', 'role', 'house_type', 'user'];

var pool = db.pool;
var pool_no_database = db.pool_no_database;

start();

function start() {  
    if (!process.env.NODE_ENV) {
        console.log('Error reading .env file. Please re-run the setup.');
        return;
    }
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
        if (helper.doesContainerHasArray(result, tablesList)) {
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

function transformShowTableResultToList(result, database) {
    list = [];
    var key = 'Tables_in_' + database;
    result.forEach(element => {
        list.push(element[key]);
    });
    return list;
}