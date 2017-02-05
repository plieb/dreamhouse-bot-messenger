/* module improts */
import { Client } from 'recastai'
import handleAction from './modules/actions'
import uploads from './modules/uploads'

const recastClient = new Client(process.env.RE_BOT_TOKEN)

export async function handleMessage(message) {
  console.log('\n**********************************************************')
  try {
    console.log('MESSAGE RECEIVED', message)

    console.log('======================================')
    console.log(message)
    console.log('======================================')
    let text = ''
    let payload = ''
    let replies = []
    if (message.content.attachment.type === 'picture') {
      await uploads(message.content.attachment)
    } else {
      if (message.content.attachment.type === 'payload') {
        payload = JSON.parse(message.content.attachment.content)
        text = payload.text
      } else {
        text = message.content.attachment.content
      }
      const { senderId } = message
      const res = await recastClient.textConverse(text, { conversationToken: senderId })
      console.log('======================================')
      console.log(res)
      console.log('======================================')
      replies = await handleAction(res, payload, message)
      console.log('======================================')
      console.log(replies)
      console.log('======================================')
    }
    replies.forEach(reply => message.addReply(reply))

    await message.reply()
  } catch (err) {
    console.error('An error occured while handling message', err)
  }
  console.log('**********************************************************\n')
}
