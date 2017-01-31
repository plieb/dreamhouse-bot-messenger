
let salesforce = require('../salesforce'),
    formatter = require('../formatter')

export default async function priceChanges(res, rep, sender) {
  console.log('PRICE CHANGES')

  let replies = []
  replies.push(formatter.formatMsg(`OK, looking for recent price changes...`))
  const priceChanges = await salesforce.findPriceChanges()
  if (priceChanges.length) {
    console.log('======================================')
    console.log('YES PRICE CHANGES')
    console.log('======================================')
    replies.push(formatter.formatProperties(properties))
  } else {
    console.log('======================================')
    console.log('NO PRICE CHANGES')
    console.log('======================================')
    replies.push(formatter.formatMsg(`Couldn't find any price changes`))
  }
  return replies
}

