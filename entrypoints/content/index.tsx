import { ReadingTimeData } from '@/utils'
import { createRoot } from 'react-dom/client'

export default defineContentScript({
  matches: ['*://*/*'],
  async main() {
    try {
      console.log('Content script started', { id: browser.runtime.id })

      const readingTime = calculateReadingTime()
      addFabButton(readingTime)

      // Send a message to the background script to update the badge text.
      browser.runtime.sendMessage({
        action: RuntimeEvent.ON_READING_TIME_CHANGE,
        data: readingTime,
      })

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          // If a new article was added.
          for (const node of mutation.addedNodes) {
            if (node instanceof Element && node.tagName === 'ARTICLE') {
              const readingTime = calculateReadingTime()
              browser.runtime.sendMessage({
                action: RuntimeEvent.ON_READING_TIME_CHANGE,
                data: readingTime,
              })
            }
          }
        }
      })

      observer.observe(document.body, { childList: true })

      window.addEventListener('load', () => {
        browser.runtime.sendMessage({
          action: RuntimeEvent.ON_READING_TIME_CHANGE,
          data: calculateReadingTime(),
        })
      })
    } catch (e) {
      console.error('Error in content script:', e)
    }
  },
})

function addFabButton(readingTime?: ReadingTimeData) {
  if (!readingTime) {
    return
  }
  // Create the floating button
  const floatingBtn = document.createElement('div')
  floatingBtn.style.position = 'fixed'
  floatingBtn.style.bottom = '48px'
  floatingBtn.style.right = '48px'
  floatingBtn.style.zIndex = '9999'
  floatingBtn.style.border = 'none'

  document.body.appendChild(floatingBtn)
  createRoot(floatingBtn).render(<FabButton readingTime={readingTime} />)
}
