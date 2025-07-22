export default defineBackground(() => {
  console.log('Background started', { id: browser.runtime.id })
  browser.runtime.onMessage.addListener(async (message, sender) => {
    try {
      switch (message.action) {
        case 'onTotalTimeChange':
          // Update the badge text with the total reading time.
          browser.action.setBadgeText({
            tabId: sender.tab?.id,
            text: formatReadingTime(message.text),
          })
          break
        default:
          break
      }
    } catch (error) {
      console.error('Error in background message listener:', error)
    }
  })
})
