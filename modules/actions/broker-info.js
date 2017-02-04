
const formatter = require('../formatter')

export default async function brokerInfo() {
  console.log('BROKER INFO')

  const replies = []
  replies.push(formatter.formatMsg('Here is the broker information for this property'))
  replies.push(formatter.formatBroker())
  return replies
}
