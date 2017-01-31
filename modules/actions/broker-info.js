
let salesforce = require('../salesforce'),
    formatter = require('../formatter')

export default async function brokerInfo(res, rep, sender) {
  console.log('BROKER INFO')

  let replies = []
  replies.push(formatter.formatMsg('Here is the broker information for this property'))
  replies.push(formatter.formatBroker())
  console.log('======================================')
  console.log(replies)
  console.log('======================================')
  return replies
}
