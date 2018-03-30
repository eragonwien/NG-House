let fs = require('fs');
let readline = require('readline-sync');
let envPath = '.env';
require('dotenv').config();
let dbConfigPath = './backend/config/db.js';

console.log('Checking environtment file.');
if (!fs.existsSync(envPath)) {
    console.log('File .env does not exist.');
    setEnv(envPath);
}
console.log('Checking for config file.');
if (!fs.existsSync(dbConfigPath)) {
    console.log('Config file for database does not exist.');
    return;
}

function setEnv(path) {
    let env = '';
    let nodeEnv = readline.question('Node environtment ? (default is development)');
    if (!nodeEnv) {
        nodeEnv = 'development';
    }
    env += ('NODE_ENV=' + nodeEnv + '\n');

    let dbHost = readline.question('DB host ? (default is localhost)');
    if (!dbHost) {
        dbHost = 'localhost';
    }
    env += ('DB_HOST=' + dbHost + '\n');
    let dbUser = readline.question('DB Username ? ');
    env += ('DB_USER=' + dbUser + '\n');

    let dbPassword = readline.question('DB Password ? ', {
        hideEchoBack: true
    });
    env += ('DB_PASSWORD=' + dbPassword + '\n');

    let dbTest = readline.question('Name of development database ? ');
    env += ('DB_TEST=' + dbTest + '\n');

    let dbProduction = readline.question('Name of production database ? ');
    env += ('DB_PRODUCTION=' + dbProduction + '\n');

    let dbPoolLimit = readline.question('DB Pool Limit ? (default is 10) ');
    if (!dbPoolLimit) {
        dbPoolLimit = 10;
    }
    env += ('DB_POOL_LIMIT=' + dbPoolLimit + '\n');

    if (readline.keyInYN('Do you want to set letiables for test data ?')) {
        // User 
        console.log('Please write all the names you can think of, separated by commas');
        let names = readline.question('Name: ');
        env += 'NAME=' + names + '\n';     

        // Postal Code 
        console.log('Please write the length of the postal code');
        let post = Math.abs(readline.questionInt('postal code length: '));
        env += 'POSTAL_CODE=' + post + '\n';    
    }

    console.log('\n' + env);
    if (readline.keyInYN('Save as .env ?')) {
        fs.writeFileSync(path, env);
        console.log('Saved.');
        return;
    }
    console.log('Canceled');    
}
