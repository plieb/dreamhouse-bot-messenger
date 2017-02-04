/* modules imports */
const formatter = require('../formatter')

export default async function brokerInfo(res, message) {
  console.log('BROKER INFO')

  const replies = []
  replies.push(formatter.formatMsg('Here is the broker information'))
  replies.push(formatter.formatBroker(message))
  return replies
}
