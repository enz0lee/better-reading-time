export default defineBackground(() => {
  console.log('Background started', { id: browser.runtime.id })
  browser.runtime.onMessage.addListener(async (message: RuntimeMessage, sender) => {
    try {
      switch (message.action) {
        case RuntimeEvent.ON_READING_TIME_CHANGE:
          // Update the badge text with the total reading time.
          browser.action.setBadgeText({
            tabId: sender.tab?.id,
            text: formatReadingTime(message.data?.totalTime),
          })
          browser.action.setBadgeBackgroundColor({
            color: '#FF9800',
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
