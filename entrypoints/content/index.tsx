import { createRoot } from 'react-dom/client'
import FabButton from './FabButton'

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    console.log('Content script started', { id: browser.runtime.id })

    const readingTime = calculateReadingTime(document.body)
    addFabButton(readingTime)
    browser.runtime.sendMessage({
      action: 'setBadgeText',
      text: readingTime.toString(),
    })

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // If a new article was added.
        for (const node of mutation.addedNodes) {
          if (node instanceof Element && node.tagName === 'ARTICLE') {
            const readingTime = calculateReadingTime(document.body)

            // Send a message to the content script to update the badge text.
            browser.runtime.sendMessage({
              action: 'setBadgeText',
              text: readingTime.toString(),
            })
          }
        }
      }
    })

    observer.observe(document.body, { childList: true })
  },
})

function addFabButton(readingTime: number) {
  // Create the floating button
  const floatingBtn = document.createElement('div')
  floatingBtn.style.position = 'fixed'
  floatingBtn.style.bottom = '24px'
  floatingBtn.style.right = '24px'
  floatingBtn.style.zIndex = '9999'
  floatingBtn.style.background = '#ffe100ff'
  floatingBtn.style.border = 'none'

  document.body.appendChild(floatingBtn)
  createRoot(floatingBtn).render(<FabButton readingTime={readingTime} />)
}
