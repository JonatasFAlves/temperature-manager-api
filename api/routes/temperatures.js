const express = require('express');
const router = express.Router();
// Connects to { host: 'localhost', port: 28015 }
const r = require('rethinkdbdash')();

const getDate = require('../../components/time');

// Get all temperatures
router.get('/', (req, res, next) => {
    r.db('tempManager').table('temperature')
        .run()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Initially we use a get request.. We need to change the 
// arduino code to send a post request
router.get('/:temp', (req, res, next) => {
    const entry = {
        temperature: req.params.temp,
        time: r.now()
    };

    r.db('tempManager').table('temperature').insert(entry)
        .run()
        .then(result => {
            res.status(200).json({
                message: 'Successfully posted temperature',
                entryPosted: entry
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;