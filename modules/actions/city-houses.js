
let salesforce = require('../salesforce'),
    formatter = require('../formatter')

export default async function cityHouses(res, rep, sender) {
  console.log('CITY HOUSES')

  let replies = []
  if (res.raw.entities.location) {
    console.log('======================================')
    console.log(res.raw.entities.location[0].raw)
    console.log('======================================')
    const city = res.raw.entities.location[0].raw
    replies.push(formatter.formatMsg(`OK, looking for houses in ${city}`))
    const properties = await salesforce.findProperties({city: city})
    if (properties.length) {
      replies.push(formatter.formatProperties(properties))
    } else {
      replies.push(formatter.formatMsg(`Couldn't find any houses in ${city}`))
    }
  } else {
    replies.push(formatter.formatMsg(`OK, looking for houses for sale around you...`))
    const properties = await salesforce.findProperties()
    replies.push(formatter.formatProperties(properties))
  }
  return replies
}

