const AVERAGE_READING_SPEED_PER_SECOND = 200 / 60
export interface ReadingTimeData {
  totalTime: number
  remainingTime: number
}

export enum RuntimeEvent {
  ON_READING_TIME_CHANGE = 'onReadingTimeChange',
}

export interface RuntimeMessage {
  action: RuntimeEvent
  data: ReadingTimeData | undefined
}

export function formatReadingTime(readingTime?: number | string): string {
  if (readingTime === undefined) {
    throw new Error('Reading time is undefined')
  }
  if (typeof readingTime === 'string') {
    readingTime = parseInt(readingTime, 10)
  }
  if (readingTime < 60) {
    return `${readingTime}s`
  }
  if (readingTime > 3600) {
    const hours = readingTime / 3600
    // Show .5 for half hours, otherwise round to nearest integer
    const formattedHours = Math.round(hours * 2) / 2
    return `${formattedHours}h`
  }
  return `${Math.round(readingTime / 60)}m`
}

function calculateWordCount(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length
}

/**
 * Calculate total reading time and remaining reading time based on current scroll position
 * @returns Updated ReadingTimeData with accurate remainingTime
 */
export function calculateReadingTime(): ReadingTimeData | undefined {
  const article = document.body
  // Calculate total reainding time
  const totalText = article.innerText
  const totalWordCount = calculateWordCount(totalText)
  const totalTime = Math.round(totalWordCount / AVERAGE_READING_SPEED_PER_SECOND)

  // if (skipCalculatingRemainingTime) {
  //   return { totalTime, remainingTime: totalTime }
  // }

  // Get remaining text from current position
  const remainingText = getRemainingTextFromPosition(article)
  const remainingWordCount = calculateWordCount(remainingText)
  const remainingTime = Math.round(remainingWordCount / AVERAGE_READING_SPEED_PER_SECOND)

  return { totalTime, remainingTime: Math.min(remainingTime, totalTime) }
}

function getRemainingTextFromPosition(article: HTMLElement): string {
  const currentScrollY = window.scrollY
  // Get all text nodes in the article
  const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement
      // Skip script and style tags
      if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
        return NodeFilter.FILTER_REJECT
      }
      // Only include nodes with actual text content
      return parent?.innerText?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })

  const textNodes: { element: HTMLElement; text: string; top: number }[] = []
  let node: Node | null

  // Collect all text nodes with their vertical positions
  while ((node = walker.nextNode())) {
    const parent = node.parentElement
    if (parent) {
      const text = node.textContent?.trim()
      if (text) {
        const rect = parent.getBoundingClientRect()
        const absoluteTop = rect.top + currentScrollY
        textNodes.push({
          element: parent,
          text,
          top: absoluteTop,
        })
      }
    }
  }

  // Sort by vertical position
  textNodes.sort((a, b) => a.top - b.top)

  // Find text nodes that are below the current reading position
  const remainingNodes = textNodes.filter((node) => node.top > currentScrollY)

  // Combine remaining text
  const remainingText = remainingNodes.map((node) => node.text).join(' ')

  return remainingText
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
