var config = {
    secret: (process.env.SESSION_SECRET) ? process.env.SESSION_SECRET : 'millenium_balkon',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (process.env.COOKIE_MAX_AGE) ? process.env.COOKIE_MAX_AGE : 60000
    }
};

exports.config = config;