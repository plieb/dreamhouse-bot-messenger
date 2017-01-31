
let salesforce = require('../salesforce'),
    formatter = require('../formatter')

export default async function cityHousesRange(res, rep, sender) {
  console.log('HOUSES RANGE')

  let replies = []
  const city = res.raw.entities.location ? res.raw.entities.location[0].raw : null
  if (res.raw.entities.number && city) {
    if (res.raw.entities.number.length === 2) {
      const priceMin = res.raw.entities.number[0].scalar
      const priceMax = res.raw.entities.number[1].scalar
      const properties = await salesforce.findProperties({priceMin: priceMin, priceMax: priceMax, city: city})
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formartMsg(`Couldn't find any houses in ${city} between ${priceMin} and ${priceMax}`))
      }
    } else {
      replies.push(formatter.formatMsg('I need a price a price range !'))
    }
  } else if (res.raw.entities.number ) {
    if (res.raw.entities.number.length === 2) {
      const priceMin = res.raw.entities.number[0].scalar
      const priceMax = res.raw.entities.number[1].scalar
      replies.push(formatter.formatMsg(`OK, looking for houses between ${priceMin} and ${priceMax}`))
      const properties = await salesforce.findProperties({priceMin: priceMin, priceMax: priceMax})
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formartMsg(`Couldn't find any houses between ${priceMin} and ${priceMax}`))
      }
    } else {
      replies.push(formatter.formatMsg('I need a price a price range !'))
    }
  } else {
      replies.push(formatter.formatMsg('I need a price a price range !'))
  }
  return replies
}
