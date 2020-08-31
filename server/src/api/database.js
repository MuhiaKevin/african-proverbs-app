const mongodb = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config()

// Database Config
mongoose.connect(process.env.MONGO_LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Database  Schema 
const Schema = mongoose.Schema;
const proverbs_schema = new Schema({
    proverb: { type: String, required: true },
    proverb_region: String
})

const Proverb = mongoose.model('Proverbs', proverbs_schema);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getProverbs(done) {
    let result = { proverb: '', region: '' }

    Proverb.find({}, (error, data) => {
        if (error) done(error, null)

        let random_interger = getRandomInt(0, data.length);
        result.proverb = data[random_interger].proverb;
        result.region = data[random_interger].proverb_region;

        done(null, result)
    })
}

module.exports = {
    getProverbs
};







