const cheerio = require('cheerio');
const got = require('got');
const { saveProverbs } = require('./database');


/*
https://matadornetwork.com/bnt/50-african-proverbs-to-get-you-thinking/
https://safarijunkie.com/culture/african-proverbs/
https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285
*/


const proverbs_url = 'https://safarijunkie.com/culture/african-proverbs/';

async function getdata() {
    const proverbs = []
    try {
        const response = await got(proverbs_url);
        const $ = cheerio.load(response.body)

        $('.post-content').find('p').each((index, element) => {
            const $element = $(element)

            if ($element.text().length > 1 && $element.text().length  < 184) {
                let proverb_text = $element.text().replace(/\~(.*)/, '').replace(/\d+./, '').trim()
                let proverb_region = $element.text().match(/\~(.*)/)[1].trim()

                proverbs.push({ proverb: proverb_text, proverb_region: proverb_region })
            }

        });

    } catch (error) {
        console.log(error)

    }

    return proverbs
}

async function saveToDatabse() {
    const proverbs = await getdata()
    saveProverbs(proverbs, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            console.log(data)

        }
    })

}

saveToDatabse()