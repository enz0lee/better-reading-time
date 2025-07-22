import { createRoot } from 'react-dom/client'
import FabButton from './FabButton'

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    console.log('Hello content.')

    const readingTime = calculateReadingTime(document.body)
    addFabButton(readingTime)
    console.log('READING TIME outer', readingTime)
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

            console.log('READING TIME inner', readingTime)
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

const AVERAGE_READING_SPEED_PER_MINUTE = 200

function calculateReadingTime(article: HTMLElement | null): number {
  // If we weren't provided an article, we don't need to render anything.
  if (!article) {
    return 0
  }

  const text = article.innerText
  if (!text) {
    return 0
  }

  const words = text.split(' ')
  const wordCount = [...words].length
  const readingTime = Math.round(wordCount / AVERAGE_READING_SPEED_PER_MINUTE)
  return readingTime
}

function addFabButton(readingTime: string | number) {
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
