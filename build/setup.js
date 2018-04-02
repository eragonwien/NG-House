const ENV_PATH = '.env';

require('dotenv').config();
let fs = require('fs');

start(function (result) {
    if (result) {
        console.log(result);
    }
    process.exit(0);
});

function start(done) {
    if (process.argv.length > 2) {
        for (let i = 0; i < process.argv.length; i++) {
            const element = process.argv[i];
            if (i >= 2) {
                console.log(element);
            }
        }
        return done('Argument catched.')
    }
    if (fs.readFileSync(ENV_PATH)) {
        console.log('File .env exists.');
        checkEnvVariables(done);
        return;
    }
    console.log('File .env does not exists.');
    let isEnvCreated = createEnv();
    if (!isEnvCreated) {
        return done('Creating .env canceled.');
    }
    checkEnvVariables(done);
}

function createEnv() {
    console.log('Creating .env');
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
        return true;
    }
    console.log('Canceled');   
    return false; 
}

function checkEnvVariables(done) {
    console.log('Checking .env variables');
    require('dotenv').config();
    let missingList = [];
    if (!process.env.NODE_ENV) {
        console.log('Node environment variable is missing');
        missingList.push('NODE_ENV');
    }
    if (!process.env.DB_HOST) {
        console.log('Database host variable is missing');
        missingList.push('DB_HOST');        
    }
    if (!process.env.DB_USER) {
        console.log('Database username variable is missing');
        missingList.push('DB_USER');
    }
    if (!process.env.DB_PASSWORD) {
        console.log('Database password variable is missing');
        missingList.push('DB_PASSWORD');
    }
    if (!process.env.DB_TEST) {
        console.log('Test database name variable is missing');
        missingList.push('DB_TEST');
    }
    if (!process.env.DB_PRODUCTION) {
        console.log('Production database name variable is missing');
        missingList.push('DB_PRODUCTION');
    }
    if (!process.env.DB_POOL_LIMIT) {
        console.log('Pool limit variable is missing');
        missingList.push('DB_POOL_LIMIT');
    }

    console.log(missingList.toString());
    let result = (missingList.length !== 0)
    done(result);
}

