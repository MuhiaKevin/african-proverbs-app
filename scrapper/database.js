const mongodb = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config()


// Database Config
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.once('open', _ => {
    console.log('Database connected', process.env.MONGO_LOCAL_URI)
})

db.on('error', error => {
    console.log(`connection error : ${error}`)
})


// Database  Schema 
const Schema = mongoose.Schema;
const proverbs_schema = new Schema({
    proverb: { type: String, required: true },
    proverb_region: String
})

const Proverb = mongoose.model('Proverbs', proverbs_schema);


function saveProverbs(proverbs, done) {
    Proverb.create(proverbs, (error, data) => {
        if (error) done(error, null)
        done(null, 'Document Successfuly added')
        mongoose.connection.close()

    })
}
module.exports = {
    saveProverbs
};







