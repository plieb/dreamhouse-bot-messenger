/* module imports */
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function scheduleVisit(res, message) {
  console.log('PRICE CHANGES')

  const replies = []
  const properties = await salesforce.findProperties({ id: message.propertyId })
  replies.push(formatter.formatAppointment(properties))
  return replies
}

