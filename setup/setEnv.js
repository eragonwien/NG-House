var readline = require('readline-sync');
var fs = require('fs');

exports.setEnv = setEnv;

function setEnv(path) {
    var env = '';
    var nodeEnv = readline.question('Node environtment ? (default is development)');
    if (!nodeEnv) {
        nodeEnv = 'development';
    }
    env += ('NODE_ENV=' + nodeEnv + '\n');

    var dbHost = readline.question('DB host ? (default is localhost)');
    if (!dbHost) {
        dbHost = 'localhost';
    }
    env += ('DB_HOST=' + dbHost + '\n');
    var dbUser = readline.question('DB Username ? ');
    env += ('DB_USER=' + dbUser + '\n');

    var dbPassword = readline.question('DB Password ? ', {
        hideEchoBack: true
    });
    env += ('DB_PASSWORD=' + dbPassword + '\n');

    var dbTest = readline.question('Name of test database ? ');
    env += ('DB_TEST=' + dbTest + '\n');

    var dbProduction = readline.question('Name of production database ? ');
    env += ('DB_PRODUCTION=' + dbProduction + '\n');

    var dbPoolLimit = readline.question('DB Pool Limit ? (default is 10)');
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


