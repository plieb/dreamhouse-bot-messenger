
let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

export default function cityHouses(res, replies, sender) {
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
    messenger.send({text: `OK, looking for houses for sale around you...`}, sender);
    salesforce.findProperties().then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
}
