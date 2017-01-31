const actions = {
  'city-houses': require('./city-houses'),
  'find-bedrooms': require('./find-bedrooms'),
  'houses-range': require('./houses-range'),
  'price-changes': require('./price-changes'),
}

export default function handleAction (res, replies, conversationToken) {
  console.log('======================================')
  console.log(res.action)
  console.log(res.action.slug)
  console.log('======================================')
  const currentAction = res.action && res.action.slug
  console.log(currentAction)
  if (actions[currentAction]) {
    console.log('Enter action')
    replies = actions[currentAction].default(res, replies, conversationToken)
  }
  return replies
}
