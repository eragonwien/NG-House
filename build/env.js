require('dotenv').config();

let fs = require('fs');
let readline = require('readline-sync');

const ENV_PATH = '.env';
const DB_CONFIG_PATH = './backend/config/db.js';

start();

function start(done) {
    console.log('Checking environtment file.');
    if (!fs.existsSync(ENV_PATH)) {
        // attemp on creating .env file
        console.log('File .env does not exist.');
        if (!readline.keyInYN('Do you want to create .env file now ?')) {
            console.log('File .env not created. Setup aborted.');
            return;
        }
        setEnv(ENV_PATH);   
    }
    let missingVariables = getMissingVariables();
    if (missingVariables.length === 0) {
        console.log('The .env file has the required vairables in correct format.');
    } else {
        console.log('Following variables are missing: ' + missingVariables.toString());
        console.log('WARNING: Varibales in .env file are inccorect or missing. This may cause unexpected behavior.');
        console.log('Please consider deleting the current .env file and run the set up again');
        return;
    }
    console.log('Setting up .env finished');
}


function setEnv(path) {
    console.log('Setting up .env');
    
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

    console.log('\n' + env);
    if (readline.keyInYN('Save as .env ?')) {
        fs.writeFileSync(path, env);
        console.log('Saved.');
        return;
    }
    console.log('Canceled');    
}

/**
 * check .env file for variables
 * @returns {string[]} list of missing variables
 */
function getMissingVariables() {
    console.log('Checking .env variables');
    require('dotenv').config();
    let errors = [];
    if (!process.env.NODE_ENV) {
        console.log('Node environment variable is missing');
        errors.push('NODE_ENV');
    }
    if (!process.env.DB_HOST) {
        console.log('Database host variable is missing');
        errors.push('DB_HOST');        
    }
    if (!process.env.DB_USER) {
        console.log('Database username variable is missing');
        errors.push('DB_USER');
    }
    if (!process.env.DB_PASSWORD) {
        console.log('Database password variable is missing');
        errors.push('DB_PASSWORD');
    }
    if (!process.env.DB_TEST) {
        console.log('Test database name variable is missing');
        errors.push('DB_TEST');
    }
    if (!process.env.DB_PRODUCTION) {
        console.log('Production database name variable is missing');
        errors.push('DB_PRODUCTION');
    }
    if (!process.env.DB_POOL_LIMIT) {
        console.log('Pool limit variable is missing');
        errors.push('DB_POOL_LIMIT');
    }

    return errors;
}
