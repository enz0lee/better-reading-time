import { ReadingTimeData } from '@/utils'
import React, { useEffect } from 'react'
import './FabButton.css'

type FabButtonProps = {
  readingSpeed: number
  readingTime: ReadingTimeData
}

const FabButton: React.FC<FabButtonProps> = ({
  readingSpeed: initialReadingSpeed,
  readingTime,
}) => {
  const [readingSpeed, setReadingSpeed] = useState(initialReadingSpeed)

  useEffect(() => {
    // Debounced scroll handler
    const handleScroll = debounce(() => {
      const updatedData = calculateReadingTime(readingSpeed)
      browser.runtime.sendMessage({
        action: RuntimeEvent.ON_READING_TIME_CHANGE,
        data: updatedData,
      })
      const fabBtn = document.querySelector('#brt-fab-button') as HTMLButtonElement
      if (fabBtn) {
        fabBtn.textContent = formatReadingTime(updatedData?.remainingTime)
      }
    }, 250)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [readingSpeed])

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
      <span>{formatReadingTime(readingTime.totalTime)}</span>
    </div>
  )
}

export default FabButton
