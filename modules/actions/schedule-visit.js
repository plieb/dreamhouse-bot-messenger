/* module imports */
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function scheduleVisit(res, message) {
  console.log('SCHEDULE VISIT')

  const replies = []
  const properties = await salesforce.findProperties({ id: message.propertyId })
  console.log('======================================')
  console.log(properties)
  console.log(properties[0])
  console.log('======================================')
  replies.push(formatter.formatAppointment(properties[0]))
  return replies
}

