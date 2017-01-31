"use strict";

let moment = require("moment"),
    numeral = require("numeral");

exports.formatMsg = msg => {
  return {
    type: 'text',
    content: msg
  }
}

exports.formatProperties = properties => {
  let elements = [];
  properties.forEach(property => {
    elements.push({
      title: property.get("Title__c"),
      subtitle: `${property.get("Address__c")}, ${property.get("City__c")} ${property.get("State__c")} · ${numeral(property.get("Price__c")).format('$0,0')}`,
      "imageUrl": property.get("Picture__c"),
      "buttons": [
        {
          "type": "postback",
          "title": "Schedule visit",
          "value": "schedule_visit," + property.getId()
        },
        {
          "type": "postback",
          "title": "View broker info",
          "value": "View broker info"
        },
        {
          "type": "postback",
          "title": "Contact me",
          "value": "Contact me"
        }
      ]
    })
  })
  return {
    type: 'carouselle',
    content: elements
  }
}

exports.formatPriceChanges = priceChanges => {
  let elements = [];
  priceChanges.forEach(priceChange => {
    let property = priceChange.get("Parent");
    elements.push({
      title: `${property.Address__c}, ${property.City__c} ${property.State__c}`,
      subtitle: `Old price: ${numeral(priceChange.get("OldValue")).format('$0,0')} · New price: ${numeral(priceChange.get("NewValue")).format('$0,0')} on ${moment(priceChange.get("CreatedDate")).format("MMM Do")}`,
      "imageUrl": property.Picture__c,
      "buttons": [
        {
          "type": "postback",
          "title": "Schedule visit",
          "value": "Schedule visit" + property.Id
        },
        {
          "type": "postback",
          "title": "View broker info",
          "value": "View broker info"
        },
        {
          "type": "postback",
          "title": "Contact me",
          "value": "Contact me"
        }
      ]
    })
  })
  return {
    type: 'carouselle',
    content: elements
  }
}


exports.formatAppointment = property => {
  var options = [
    moment().add(1, 'days').format('ddd MMM Do') + ' at 10am',
    moment().add(2, 'days').format('ddd MMM Do') + ' at 9am',
    moment().add(2, 'days').format('ddd MMM Do') + ' at 5pm',
    moment().add(3, 'days').format('ddd MMM Do') + ' at 1pm',
    moment().add(3, 'days').format('ddd MMM Do') + ' at 6pm',
  ];
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "button",
        "text": `Select one of the available appointments below at ${property.get("Address__c")} in ${property.get("City__c")}.`,
        "buttons": [
          {
            "type": "postback",
            "title": options[0],
            "payload": "confirm_visit," + property.get("Address__c") + " in " + property.get("City__c") + "," + options[0]
          },
          {
            "type": "postback",
            "title": options[1],
            "payload": "confirm_visit," + property.get("Address__c") + " in " + property.get("City__c") + "," + options[1]
          },
          {
            "type": "postback",
            "title": options[2],
            "payload": "confirm_visit," + property.get("Address__c") + " in " + property.get("City__c") + "," + options[2]
          }
        ]
      }
    }
  }
}

exports.formatBroker = broker => {
  console.log('======================================')
  console.log('HELLO')
  console.log('======================================')
  let elements = [];
  elements.push({
    title: "Caroline Kingsley",
    subtitle: "Senior Broker  · 617-219-6363 · ckingsley@dreamhouse.com",
    "imageUrl": "https://s3-us-west-1.amazonaws.com/sfdc-demo/messenger/caroline_500x260.png",
    "buttons": [
      {
        "type": "postback",
        "title": "Contact Me",
        "value": "Contact me"
      }
    ]
  })
  return {
    type: 'card',
    content: elements
  }
}
