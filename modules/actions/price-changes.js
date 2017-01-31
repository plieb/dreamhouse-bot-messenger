
let salesforce = require('../salesforce'),
    messenger = require('../messenger'),
    formatter = require('../formatter');

export default function priceChanges(res, replies, sender) {
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
  console.log('PRICE CHANGES')

  //let replies = []
  messenger.send({text: `OK, looking for recent price changes...`}, sender)
  salesforce.findPriceChanges().then(priceChanges => {
    if (priceChanges.length) {
      console.log('======================================')
      console.log('YES PRICE CHANGES')
      console.log('======================================')
      messenger.send(formatter.formatPriceChanges(priceChanges), sender)
    } else {
      console.log('======================================')
      console.log('NO PRICE CHANGES')
      console.log('======================================')
      messenger.send({text: `Couldn't find any price changes`}, sender)
    }
  })
}

