/* modules imports */
const formatter = require('../formatter')

export default async function confirmVisit(res, message) {
  console.log('CONFIRM VISIT')

  const replies = []
  if (message.date) {
    replies.push(formatter.formatMsg(`OK, your appointment is confirmed for ${message.date} in ${message.city}.`))
  } else {
    replies.push(formatter.formatMsg('OK, your appointment is confirmed !'))
  }
  return replies
}
