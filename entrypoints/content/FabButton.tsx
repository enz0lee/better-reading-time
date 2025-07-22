import { ReadingTimeData } from '@/utils'
import React from 'react'

type FabButtonProps = {
  onClick?: () => void
  size?: number
  readingTime: ReadingTimeData
}

const FabButton: React.FC<FabButtonProps> = ({ onClick, size = 56, readingTime }) => (
  <button
    id="readinger-fab-button"
    onClick={onClick}
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: '#1976d2',
      border: 'none',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#fff',
      padding: 0,
      fontSize: 16,
      fontWeight: 500,
    }}
  >
    {formatReadingTime(readingTime)}
  </button>
)

export default FabButton
