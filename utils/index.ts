const AVERAGE_READING_SPEED_PER_SECOND = 200 / 60
export interface ReadingTimeData {
  totalTime: number
  remainingTime: number
}

/**
 * Calculate the reading time of an article.
 * @param article
 * @returns reading time in seconds
 */
export function calculateReadingTime(article: HTMLElement | null): ReadingTimeData | undefined {
  // If we weren't provided an article, we don't need to render anything.
  if (!article) {
    return undefined
  }

  const text = article.innerText
  if (!text) {
    return undefined
  }

  const words = text.split(/\s+/).filter((word) => word.length > 0)
  const wordCount = words.length
  const totalTime = Math.round(wordCount / AVERAGE_READING_SPEED_PER_SECOND)
  return { totalTime, remainingTime: totalTime }
}

export function formatReadingTime(readingTime: number | string): string {
  if (typeof readingTime === 'string') {
    readingTime = parseInt(readingTime, 10)
  }
  if (readingTime < 60) {
    return `${readingTime}s`
  }
  return `${Math.round(readingTime / 60)}m`
}
