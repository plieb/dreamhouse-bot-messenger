
let salesforce = require('../salesforce'),
    messenger = require('../messenger'),
    formatter = require('../formatter');

export default function cityHousesRange(res, rep, sender) {
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
      //messenger.send({text: `OK, looking for houses between ${priceMin} and ${priceMax} in ${city}`}, sender);
      let msg = {
        type: 'text',
        content: `OK, looking for houses between ${priceMin} and ${priceMax} in ${city}`
      }
      replies.push(msg)
      salesforce.findProperties({priceMin: priceMin, priceMax: priceMax, city: city}).then(properties => {
        if (properties.length) {
          console.log('======================================')
          console.log('IN LENGTH')
          console.log('======================================')
//          messenger.send(formatter.formatProperties(properties), sender);
          let msg = formatter.formatProperties(properties)
          replies.push(msg)
        } else {
          let msg = {
            type: 'text',
            content: `Couldn't find any houses in ${city} between ${priceMin} and ${priceMax}`
          }
          replies.push(msg)
          //messenger.send({text: `Couldn't find any houses in ${city} between ${priceMin} and ${priceMax}`}, sender);
        }
      })
    } else {
      messenger.send({text: `I need a price a price range !`}, sender);
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
      messenger.send({text: `OK, looking for houses between ${priceMin} and ${priceMax}`}, sender);
      salesforce.findProperties({priceMin: priceMin, priceMax: priceMax}).then(properties => {
        if (properties.length) {
          messenger.send(formatter.formatProperties(properties), sender);
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
