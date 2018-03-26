var nodemailer = require('nodemailer');

//sendMail('gmail', 'eragonwien@gmail.com', 'tzlzngagxmpgnepr', 'benswolo@sw.com', 'eragonwien@gmail.com', 'Node mailer', 'Hello From Swoland');

/**
 * send an email
 * @param {string} service service name
 * @param {string} user email
 * @param {string} password email password
 * @param {string} sender email of sender
 * @param {string} receiver email of receiver
 * @param {string} subject subject of the email
 * @param {string} text text content of the email
 */
function sendMail(service, user, password, sender, receiver, subject, text, done) {
    nodemailer.createTestAccount(function (error, account) {
        if (error) {
            return done(error);
        }
        // create transporter
        var transporter = getTransport(service, user, password);

        var mailOptions = {
            from: sender,
            to: receiver,

            subject: subject,
            text: text,
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return done(error);
            }
            done(null, info);
            transporter.close();
        });
    });
}

/**
 * prepare parameters for sending email
 * @param {object} params parameter for sending email
 */
function prepareEmail(params, done) {
    // get user and password
    var service = process.env.EMAIL_SERVICE ? process.env.EMAIL_SERVICE : 'gmail';
    var user = process.env.EMAIL ? process.env.EMAIL : 'eragonwien@gmail.com';
    const pass = process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD : 'tzlzngagxmpgnepr';

    sendMail(service, user, pass, params.sender, params.receiver, params.subject, params.text, function (error, result) {
        if (error) {
            return done(error);
        }
        done(null, result);
    });
}
exports.prepareEmail = prepareEmail;

/**
 * returns a transporter for node mailer
 * @param {string} service mail service name
 * @param {string} user email address
 * @param {string} password password or app-password
 */
function getTransport(service, user, password) {
    // create transporter
    var transporter = nodemailer.createTransport({
        service: service,
        auth: {
            user: user,
            pass: password
        }
    });
    return transporter;
}