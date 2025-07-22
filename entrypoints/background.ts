export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })
  browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'setBadgeText') {
      browser.action.setBadgeText({ text: message.text })
    }
  })
})
