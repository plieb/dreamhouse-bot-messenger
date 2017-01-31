
let salesforce = require('../salesforce'),
    messenger = require('../messenger'),
    formatter = require('../formatter');

export default async function cityHousesRange(res, rep, sender) {
  console.log('HOUSES RANGE')

  let replies = []
  const city = res.raw.entities.location ? res.raw.entities.location[0].raw : null
  console.log('======================================')
  console.log(`CITY : ${city}`)
  console.log('======================================')
  if (res.raw.entities.number && city) {
    console.log('======================================')
    console.log('CITY AND NUMBER')
    console.log('======================================')
    if (res.raw.entities.number.length === 2) {
      const priceMin = res.raw.entities.number[0].scalar
      const priceMax = res.raw.entities.number[1].scalar
      console.log(`MIN : ${priceMin}`)
      console.log(`MAX : ${priceMax}`)
      replies.push(formatter.formatMsg(`OK, looking for houses between ${priceMin} and ${priceMax} in ${city}`))
      const properties = await salesforce.findProperties({priceMin: priceMin, priceMax: priceMax, city: city})
      if (properties.length) {
        console.log('======================================')
        console.log('IN LENGTH')
        console.log('======================================')
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formartMsg(`Couldn't find any houses in ${city} between ${priceMin} and ${priceMax}`))
      }
    } else {
      replies.push(formatter.formatMsg('I need a price a price range !'))
    }
  } else if (res.raw.entities.number ) {
    console.log('======================================')
    console.log('NO CITY BUT NUMBER')
    console.log('======================================')
    if (res.raw.entities.number.length === 2) {
      const priceMin = res.raw.entities.number[0].scalar
      const priceMax = res.raw.entities.number[1].scalar
      console.log(`MIN : ${priceMin}`)
      console.log(`MAX : ${priceMax}`)
      let msg = {
        type: 'text',
        content: `OK, looking for houses between ${priceMin} and ${priceMax}`
      }
      replies.push(msg)
      const properties = await salesforce.findProperties({priceMin: priceMin, priceMax: priceMax})
        if (properties.length) {
          messenger.send(formatter.formatProperties(properties), sender);
          replies.push(msg)
          let msg = formatter.formatProperties(properties)
        } else {
          messenger.send({text: `Couldn't find any houses between ${priceMin} and ${priceMax}`}, sender);
        }
      })
    } else {
      messenger.send({text: `I need a price a price range !`}, sender);
    }
  } else {
      messenger.send({text: `I need a price a price range !`}, sender);
  }
  console.log('======================================')
  console.log(replies)
  console.log('======================================')
  return replies
}
