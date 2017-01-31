const actions = {
  'city-houses': require('./city-houses'),
  'find-bedrooms': require('./find-bedrooms'),
  'houses-range': require('./houses-range'),
  'price-changes': require('./price-changes'),
  'broker-info': require('./broker-info'),
  'contact-me': require('./contact-me'),
}

export default function handleAction (res, replies, conversationToken) {
  const currentAction = res.action && res.action.slug
  console.log(currentAction)
  if (actions[currentAction]) {
    console.log('Enter action')
    replies = actions[currentAction].default(res, replies, conversationToken)
  } else if (res.reply()) {
    replies.push({
      type: 'text',
      content: res.reply()
    })
  } else {
    replies.push({
      type: 'text',
      content: 'Sorry I did not understand'
    })
  }
  return replies
}
