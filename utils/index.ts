const AVERAGE_READING_SPEED_PER_SECOND = 200 / 60

/**
 * Calculate the reading time of an article.
 * @param article
 * @returns reading time in seconds
 */
export function calculateReadingTime(article: HTMLElement | null): number {
  // If we weren't provided an article, we don't need to render anything.
  if (!article) {
    return 0
  }

  const text = article.innerText
  if (!text) {
    return 0
  }

  const words = text.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length
  const readingTime = Math.round(wordCount / AVERAGE_READING_SPEED_PER_SECOND)
  return readingTime
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
