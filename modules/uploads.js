/* modules imports */
const formatter = require('./formatter')
const salesforce = require('./salesforce')
const visionService = require('./vision-service-mock')

export default async function processUpload(attachments) {
  console.log('UPLOAD IMAGE')
  const attachment = attachments[0]

  const replies = []
  replies.push(formatter.formatMsg('OK, let me look at that picture...'))
  const houseType = await visionService.classify(attachment.url)
  replies.push(formatter.formatMsg(`Looking for houses matching "${houseType}"`))
  const properties = await salesforce.findPropertiesByCategory(houseType)
  replies.push(formatter.formatProperties(properties))
  return replies
}
