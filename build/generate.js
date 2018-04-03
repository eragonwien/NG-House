require('dotenv').config();
let readline = require('readline-sync');

let generator = require('../backend/components/testGenerator/test.generator.model');

start();

// start the data generation
function start() {
   let type = getParameter();
   if (!type) {
       console.log('No type parameter found.');
       return;
   }
   type = type.toLowerCase();
   let count = 1;
   if (type !== 'admin') {
       // if type is admin, only 1 is generated
       // else, the number of test cases is required
       count = readline.questionInt('Number of test cases ?');
   }
   let test = {
       type: type,
       count: Math.abs(count)
   };
   generator.startTest(test, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(result.count + ' ' + type + ' created.');
        if (type === 'admin') {
            console.log('username: ' + result.user.username);
            console.log('password: test');
        }
        process.exit(0);
   });
}

function getParameter() {
    return (process.argv[2]) ? process.argv[2] : null;
}
