var fs = require('fs');
var envPath = '.env';
require('dotenv').config();
var dbConfigPath = './config/db.js';
var setEnv = require('./setEnv');
var checkDb = require('./checkDb');

console.log('Checking environtment file.');
if (!fs.existsSync(envPath)) {
    console.log('File .env does not exist.');
    setEnv.setEnv(envPath);
}
console.log('Checking database.');
if (!fs.existsSync(dbConfigPath)) {
    console.log('Config file for database does not exist.');
    return;
}
checkDb.start();
