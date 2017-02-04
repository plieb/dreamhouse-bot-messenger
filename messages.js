/* module improts */
import { Client } from 'recastai'
import handleAction from './modules/actions'

const recastClient = new Client(process.env.RE_BOT_TOKEN)

export async function handleMessage (message) {
  console.log('\n**********************************************************')
  try {
    console.log('MESSAGE RECEIVED', message)
    let text = message.content.attachment.content
    if (message.content.attachment.type === 'payload') {
      text = message.content.attachment.content.text
    }
    const { senderId } = message
    const res = await recastClient.textConverse(text, { conversationToken: senderId })
    console.log('======================================')
    console.log(res)
    console.log('======================================')
    const replies = await handleAction(res, message)
    replies.forEach(reply => message.addReply(reply))

    await message.reply()
  } catch (err) {
    console.error('An error occured while handling message', err)
  }
  console.log('**********************************************************\n')
}
