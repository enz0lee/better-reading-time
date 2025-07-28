import { DEFAULT_WPM, FabVisibility, StorageKey } from '@/utils'
import React, { useEffect, useState } from 'react'
import './App.css'

const KOFI_ID = 'T6T41ICUDW'

function App() {
  const [readingSpeed, setReadingSpeed] = useState<number | undefined>(undefined)
  const [fabVisibility, setFabVisibility] = useState<FabVisibility>(FabVisibility.SHOW)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const num = Number(value)
    if (value.trim() === '' || isNaN(num) || num <= 0) {
      setReadingSpeed(undefined)
    } else {
      setReadingSpeed(num)
    }
  }

  const handleToggleFab = () => {
    setFabVisibility(fabVisibility === FabVisibility.SHOW ? FabVisibility.HIDE : FabVisibility.SHOW)
  }

  // Load reading speed and FabButton visibility from storage when the component mounts
  useEffect(() => {
    const loadSettings = async () => {
      const storedReadingSpeed = await storage.getItem<number>(StorageKey.READING_SPEED, {
        fallback: DEFAULT_WPM,
      })
      if (storedReadingSpeed) {
        setReadingSpeed(storedReadingSpeed)
      }
      const storedFabVisibility = await storage.getItem<FabVisibility>(StorageKey.FAB_VISIBILITY, {
        fallback: FabVisibility.SHOW,
      })
      setFabVisibility(storedFabVisibility)
    }
    loadSettings()
  }, [])

  // Update reading speed to local storage and badge
  useEffect(() => {
    if (readingSpeed === undefined) return
    const handler = setTimeout(() => {
      storage.setItem<number>(StorageKey.READING_SPEED, readingSpeed)
    }, 250)
    return () => clearTimeout(handler)
  }, [readingSpeed])

  // Update FabButton visibility in local storage
  useEffect(() => {
    const handler = setTimeout(() => {
      storage.setItem<FabVisibility>(StorageKey.FAB_VISIBILITY, fabVisibility)
    }, 250)
    return () => clearTimeout(handler)
  }, [fabVisibility])

  return (
    <div className="p-6 bg-white flex flex-col">
      {/* Reading Speed Input Row */}
      <div className="flex items-center">
        <label
          htmlFor="reading-speed"
          className="text-base font-medium  text-gray-700 whitespace-nowrap"
        >
          Reading Speed
        </label>
        <div className="flex items-center ml-4">
          <input
            id="reading-speed"
            type="number"
            value={readingSpeed}
            onChange={handleInputChange}
            placeholder="WPM"
            className="w-16 px-1 py-0.5 border-2 placeholder:text-gray-400 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-colors text-sm"
          />
        </div>
      </div>
      {/* FabButton Toggle Row */}
      <div className="flex items-center mt-4">
        <label htmlFor="toggle-fab" className="text-base font-medium text-gray-700">
          Show Floating Button
        </label>
        <input
          id="toggle-fab"
          type="checkbox"
          checked={fabVisibility === FabVisibility.SHOW}
          onChange={handleToggleFab}
          className="ml-3 w-5 h-5 accent-amber-400"
        />
      </div>
      <span className="text-sm text-gray-500 mt-2 text-left">
        Not sure?{' '}
        <a
          href="https://readingsoft.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-600 underline"
        >
          Test your reading speed
        </a>
      </span>

      <hr className="border-t-2 border-gray-200 my-5" />

      {/* Ko-fi button */}
      <a href={`https://ko-fi.com/${KOFI_ID}`} target="_blank" rel="noreferrer">
        <img
          id="kofi-button"
          src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
    </div>
  )
}

export default App
