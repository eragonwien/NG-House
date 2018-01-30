var file = require('fs');

file.readFile('models/db.sql', function (error, content) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(content.toString());
})