/* modules imports */
const formatter = require('../formatter')

export default async function confirmVisit(res, message) {
  console.log('CONFIRM VISIT')

  const replies = []
  replies.push(formatter.formatMsg(`OK, your appointment is confirmed for ${message.date} in ${message.city}.`))
  replies.push(formatter.formatBroker())
  return replies
}
