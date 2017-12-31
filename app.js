const express = require('express');
const app = express();
const morgan = require('morgan');

// Routes
const lm = require('./api/routes/lm');

// Added npm morgan as a logging tool
app.use(morgan('dev'));

// When request hit this resource pass it to lm route
app.use('/temperature-manager/api/lm', lm);

// If request not found by handlers above
app.use((req, res, next) => {
    const error = new Error('Resource not found...');
    error.status = 404;
    next(error);
});

// If application has an error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;