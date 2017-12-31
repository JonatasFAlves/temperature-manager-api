const express = require('express');
const router = express.Router();

router.get('/:temp', (req, res, next) => {
    const temperature = req.params.temp;
    res.status(200).json({ 
        message: 'Successfully posted temperature',
        tempPosted: temperature  
    });
});

module.exports = router;