/* module imports */
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function scheduleVisit(res, message) {
  console.log('PRICE CHANGES')

  const replies = []
  if (message.content.attachment.type === 'payload') {
    const propertyId = message.content.attachement.content.propertyId
    const properties = await salesforce.findProperties({ id: propertyId })
    replies.push(formatter.formatAppointment(properties))
  }
  return replies
}

