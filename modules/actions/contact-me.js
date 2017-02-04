
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function contactMe(res, message) {
  console.log('CONTACT ME')

  const replies = []
  replies.push(formatter.formatMsg('Thanks for your interest. I asked a broker to contact you asap.'))
  const firstName = message.content.data.userName.split(' ')[0]
  const lastName = message.content.data.userName.split(' ')[1]
  if (message.propertyId) {
    const propertyId = message.propertyId
    await salesforce.createCase(`${firstName} ${lastName}`, message.senderId, propertyId)
  } else {
    await salesforce.createCase(`${firstName} ${lastName}`, message.senderId)
  }
  return replies
}
