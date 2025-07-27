import { ReadingTimeData } from '@/utils'
import React, { useEffect } from 'react'
import './FabButton.css'

type FabButtonProps = {
  readingSpeed: number
  readingTime: ReadingTimeData
}

const FabButton: React.FC<FabButtonProps> = ({
  readingSpeed: initialReadingSpeed,
  readingTime: initialReadingTime,
}) => {
  const [readingSpeed, setReadingSpeed] = useState<number>(initialReadingSpeed)
  const [readingTime, setReadingTime] = useState<ReadingTimeData | undefined>(initialReadingTime)
  const fabContent = React.useMemo(
    () => formatReadingTime(readingTime?.remainingTime),
    [readingTime]
  )

  // Update reading time based on reading speed
  useEffect(() => {
    const updatedReadingTime = calculateReadingTime(readingSpeed)
    setReadingTime(updatedReadingTime)
    browser.runtime.sendMessage({
      action: RuntimeEvent.ON_READING_TIME_CHANGE,
      data: updatedReadingTime,
    })
  }, [readingSpeed])

  // Update reading time on scroll
  useEffect(() => {
    // Debounced scroll handler
    const handleScroll = debounce(() => {
      const updatedReadingTime = calculateReadingTime(readingSpeed)
      browser.runtime.sendMessage({
        action: RuntimeEvent.ON_READING_TIME_CHANGE,
        data: updatedReadingTime,
      })
      setReadingTime(updatedReadingTime)
    }, 250)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [readingSpeed])

  // Watch for changes in reading speed from storage
  useEffect(() => {
    const unwatch = storage.watch<number>(StorageKey.READING_SPEED, (newReadingSpeed) => {
      if (newReadingSpeed) {
        setReadingSpeed(newReadingSpeed)
      }
    })
    return () => {
      unwatch()
    }
  }, [])

  return (
    <div id="brt-fab-button">
      <span>{fabContent}</span>
    </div>
  )
}

export default FabButton
