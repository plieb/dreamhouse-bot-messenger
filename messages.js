import { Client  } from 'recastai'
import handleAction from './modules/actions'

const recastClient = new Client(process.env.RE_BOT_TOKEN)

export async function handleMessage (message) {
  console.log('\n**********************************************************')
  try {
    const text = message.content.attachment.content
    const { senderId  } = message
    console.log('MESSAGE RECEIVED', message)
    const res = await recastClient.textConverse(text, { conversationToken: senderId  })
    handleAction(res, message.reply(), conversationToken)
    //await message.reply()

  } catch (err) {
    console.error('An error occured while handling message', err)

  }
  console.log('**********************************************************\n')

}
