
let salesforce = require('../salesforce'),
    formatter = require('../formatter')

export default async function contactMe(res, rep, sender) {
  console.log('CONTACT ME')

  let replies = []
  replies.push(formatter.formatMsg('Thanks for your interest. I asked a broker to contact you asap.'))
  return replies
}
