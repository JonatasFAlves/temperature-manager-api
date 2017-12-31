const express = require('express');
const router = express.Router();
// Connects to { host: 'localhost', port: 28015 }
const r = require('rethinkdbdash')();

router.get('/', (req, res, next) => {
    r.db('tempManager').table('ac')
        .run()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;