/* module imports */
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function scheduleVisit(res, message) {
  console.log('SCHEDULE VISIT')

  const replies = []
  const property = await salesforce.findProperties({ id: message.propertyId })
  console.log('======================================')
  console.log(property)
  console.log('======================================')
  replies.push(formatter.formatAppointment(property))
  return replies
}

