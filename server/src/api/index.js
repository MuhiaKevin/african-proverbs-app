const express = require('express');

const emojis = require('./emojis');
const proverbs =require('./proverbs')


const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/proverbs', proverbs);

module.exports = router;
