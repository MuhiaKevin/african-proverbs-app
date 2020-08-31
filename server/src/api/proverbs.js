const express = require('express');
const { getProverbs } = require('./database')
const router = express.Router();


router.get('/', (req, res) => {
    getProverbs((error, data) => {
        if (error) {
            res.status(502).json({ error: 'Internal error occured' })
        }
        res.status(200).json({ proverb: data.proverb, region: data.region });
    })
});

module.exports = router;
