
let salesforce = require('../salesforce'),
    messenger = require('../messenger'),
    formatter = require('../formatter');

export default function findBedrooms(res, replies, sender) {
/*  const content = {
    title: replies[0].content,
    buttons: [{
      title: 'Annulation',
      value: 'PAYLOAD_ANNULATION',
    },
      {
        title: 'Rapatriement et frais medicaux',
        value: 'PAYLOAD_RAPATRIEMENT',
      },
      {
        title: 'Bagages',
        value: 'PAYLOAD_BAGAGES',
      },
      {
        title: 'Individuelle accident',
        value: 'PAYLOAD_INDIVIDUELLE',
      },
    ]
  }
  replies[0] = ({
    type: 'quickReplies',
    content,
  })
  return replies*/
  console.log('FIND BEDRROMS')


  const city = res.raw.entities.location ? res.raw.entities.location[0].raw : null
  const bedrooms = parseInt(res.raw.entities.location ? res.raw.entities.bedrooms[0].raw : null)
  if (res.raw.entities.number && city) {
    console.log('======================================')
    console.log('CITY AND NUMBER')
    console.log('======================================')
    if (res.raw.entities.number.length === 2) {
      const priceMin = res.raw.entities.number[0].scalar
      const priceMax = res.raw.entities.number[1].scalar
      console.log(`MIN : ${priceMin}`)
      console.log(`MAX : ${priceMax}`)
      messenger.send({text: `OK, looking for houses between ${priceMin} and ${priceMax} in ${city} with ${bedrooms} bedrooms`}, sender);
      salesforce.findProperties({priceMin: priceMin, priceMax: priceMax, city: city, bedrooms: bedrooms}).then(properties => {
        if (properties.length) {
          messenger.send(formatter.formatProperties(properties), sender);
        } else {
          messenger.send({text: `Couldn't find any houses in ${city} between ${priceMin} and ${priceMax} with ${bedrooms} bedrooms`}, sender);
        }
      })
    } else {
      messenger.send({text: `OK, looking for houses between in ${city} with ${bedrooms} bedrooms`}, sender);
      salesforce.findProperties({priceMin: priceMin, priceMax: priceMax, city: city, bedrooms: bedrooms}).then(properties => {
        if (properties.length) {
          messenger.send(formatter.formatProperties(properties), sender);
        } else {
          messenger.send({text: `Couldn't find any houses in ${city} with ${bedrooms} bedrooms`}, sender);
        }
      })
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
      messenger.send({text: `OK, looking for houses between ${priceMin} and ${priceMax} with ${bedrooms} bedrooms`}, sender);
      salesforce.findProperties({priceMin: priceMin, priceMax: priceMax, bedrooms: bedrooms}).then(properties => {
        if (properties.length) {
          messenger.send(formatter.formatProperties(properties), sender);
        } else {
          messenger.send({text: `Couldn't find any houses between ${priceMin} and ${priceMax} with ${bedrooms} bedrooms`}, sender);
        }
      })
    } else {
      messenger.send({text: `OK, looking for houses between with ${bedrooms} bedrooms`}, sender);
      salesforce.findProperties({bedrooms: bedrooms}).then(properties => {
        if (properties.length) {
          messenger.send(formatter.formatProperties(properties), sender);
        } else {
          messenger.send({text: `Couldn't find any houses with ${bedrooms} bedrooms`}, sender);
        }
      })
    }
  } else {
    messenger.send({text: `OK, looking for houses between with ${bedrooms} bedrooms`}, sender);
    salesforce.findProperties({bedrooms: bedrooms}).then(properties => {
      if (properties.length) {
        messenger.send(formatter.formatProperties(properties), sender);
      } else {
        messenger.send({text: `Couldn't find any houses with ${bedrooms} bedrooms`}, sender);
      }
    })
  }
}




  const city = res.raw.entities.location ? res.raw.entities.location[0].raw : null
  console.log('======================================')
  console.log(`CITY : ${city}`)
  console.log('======================================')
}
