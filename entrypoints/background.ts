export default defineBackground(() => {
  console.log('Background started', { id: browser.runtime.id })
  browser.runtime.onMessage.addListener(async (message) => {
    try {
      if (message.action === 'setBadgeText') {
        browser.action.setBadgeText({ text: formatReadingTime(message.text) })
      }
    } catch (error) {
      console.error('Error in background message listener:', error)
    }
  })

  // Listen for tab active changed to update the badge text
  browser.tabs.onActivated.addListener(async (activeInfo) => {
    try {
      const res = await browser.scripting.executeScript<unknown[], string>({
        target: { tabId: activeInfo.tabId },
        files: ['content-scripts/activeTab.js'],
      })
      const formattedReadingTime = res[0]?.result
      browser.action.setBadgeText({ text: formattedReadingTime })
    } catch (error) {
      console.error('Error in background on tab active listener', error)
    }
  })
})
