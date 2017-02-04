
const salesforce = require('../salesforce')
const formatter = require('../formatter')

export default async function contactMe(res, message) {
  console.log('CONTACT ME')

  const replies = []
  replies.push(formatter.formatMsg('Thanks for your interest. I asked a broker to contact you asap.'))
  if (message.content.attachment.type === 'payload') {
    const propertyId = message.content.attachement.content.split(',')[1]
    const firstName = message.content.data.userName.split(' ')[0]
    const lastName = message.content.data.userName.split(' ')[1]
    await salesforce.createCase(propertyId, `${firstName} ${lastName}`, message.senderId)
  }
  return replies
}
