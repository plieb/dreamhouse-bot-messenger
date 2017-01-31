
let salesforce = require('../salesforce'),
  formatter = require('../formatter');

export default function findBedrooms(res, rep, sender) {
  console.log('FIND BEDRROMS')

  let replies =[]
  const city = res.raw.entities.location ? res.raw.entities.location[0].raw : null
  const bedrooms = parseInt(res.raw.entities.location ? res.raw.entities.bedrooms[0].raw : null)
  if (res.raw.entities.number && city) {
    console.log('======================================')
    console.log('CITY AND NUMBER AND BEDROOMS')
    console.log('======================================')
    if (res.raw.entities.number.length === 2) {
      const priceMin = res.raw.entities.number[0].scalar
      const priceMax = res.raw.entities.number[1].scalar
      replies.push(formatter.formatMsg(`OK, looking for houses between ${priceMin} and ${priceMax} in ${city} with ${bedrooms} bedrooms`))
      const properties = salesforce.findProperties({priceMin: priceMin, priceMax: priceMax, city: city, bedrooms: bedrooms})
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses in ${city} between ${priceMin} and ${priceMax} with ${bedrooms} bedrooms`))
      }
    } else {
      console.log('======================================')
      console.log('NO CITY AND BEDROOMS')
      console.log('======================================')
      replies.push(formatter.formatMsg(`OK, looking for houses between in ${city} with ${bedrooms} bedrooms`))
      const properties = salesforce.findProperties({city: city, bedrooms: bedrooms})
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses in ${city} with ${bedrooms} bedrooms`))
      }
    }
  } else if (res.raw.entities.number ) {
    console.log('======================================')
    console.log('NO CITY BUT NUMBER AND BEDROOMS')
    console.log('======================================')
    if (res.raw.entities.number.length === 2) {
      const priceMin = res.raw.entities.number[0].scalar
      const priceMax = res.raw.entities.number[1].scalar
      replies.push(formatter.formatMsg(`OK, looking for houses between ${priceMin} and ${priceMax} with ${bedrooms} bedrooms`))
      const properties = salesforce.findProperties({priceMin: priceMin, priceMax: priceMax, bedrooms: bedrooms})
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses between ${priceMin} and ${priceMax} with ${bedrooms} bedrooms`))
      }
    } else {
      console.log('======================================')
      console.log('JUST BEDROOMS')
      console.log('======================================')
      replies.push(formatter.formatMsg(`OK, looking for houses between with ${bedrooms} bedrooms`))
      const properties = salesforce.findProperties({bedrooms: bedrooms})
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses with ${bedrooms} bedrooms`))
      }
    }
  } else {
    if (city) {
      console.log('======================================')
      console.log('CITY AND BEDROOMS')
      console.log('======================================')
      replies.push(formatter.formatMsg(`OK, looking for houses between with ${bedrooms} bedrooms in ${city}`))
      const properties = salesforce.findProperties({bedrooms: bedrooms, city: city})
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses with ${bedrooms} bedrooms in ${city}`))
      }
    } else {
      console.log('======================================')
      console.log('JUST BEDROOMS')
      console.log('======================================')
      replies.push(formatter.formatMsg(`OK, looking for houses between with ${bedrooms} bedrooms`))
      const properties = salesforce.findProperties({bedrooms: bedrooms})
      if (properties.length) {
        replies.push(formatter.formatProperties(properties))
      } else {
        replies.push(formatter.formatMsg(`Couldn't find any houses with ${bedrooms} bedrooms`))
      }
    }
  }
  return replies
}
