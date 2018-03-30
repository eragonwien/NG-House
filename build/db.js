let fs = require('fs');
require('dotenv').config();
let readline = require('readline-sync');
let db = require('../backend/config/db');
let helper = require('./helper');
const sqlCreatePath = './backend/config/sql/create.sql';
const sqlInsertPath = './backend/config/sql/insert.sql';
const sqlViewsPath = './backend/config/sql/views.sql';
const tablesList = ['address', 'currency', 'house', 'role', 'house_type', 'user'];

let pool = db.pool;
let pool_no_database = db.pool_no_database;

start();

function start() {  
    if (!process.env.NODE_ENV) {
        console.log('Error reading .env file. Please re-run the setup.');
        return;
    }
    createDatabase(checkTables);
}

function createDatabase(next) {
    let database = (process.env.NODE_ENV == 'production') ? process.env.DB_PRODUCTION : process.env.DB_TEST;
    let cmd = 'CREATE DATABASE IF NOT EXISTS ' + database + ';';
    pool_no_database.query(cmd, null, function (error, result) {
        if (error) {
            return close(error);
        }
        next(database);
    })
}

function checkTables(database) {
    console.log('Checking if the required tables exist in the current database')
    let cmd = 'SHOW TABLES;';
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
            return createViews();
        }
        console.log('Tables are missing. Process on creating tables on existing database.')
        createTables();
    })
}

function createTables() {
    console.log('Creating tables.');
    let sql = fs.readFileSync(sqlCreatePath);
    sql = sql.toString();
    pool.query(sql, null, function (error, result) {
        if (error) {
            return close(error);
        }
        console.log('Tables successfully created.');
        insertTables();
    });
}

function insertTables() {
    console.log('Inserting default values');
    let sql = fs.readFileSync(sqlInsertPath);
    sql = sql.toString();
    pool.query(sql, null, function (error, result) {
        if (error) {
            return close(error);
        }
        console.log('Tables successfully inserted.');
        createViews();
    });
}

function createViews() {
    if (!readline.keyInYN('Do you want to re-create all the views ?')) {
        return finish();
    }
    console.log('Creating views.');
    let sql = fs.readFileSync(sqlViewsPath).toString();
    pool.query(sql, null, function (error, result) {
        if (error) {
            return close(error);
        }
        console.log('View created.');
        finish();      
    });
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
    let key = 'Tables_in_' + database;
    result.forEach(element => {
        list.push(element[key]);
    });
    return list;
}