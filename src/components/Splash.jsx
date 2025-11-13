import React, { useState } from 'react'
import logo from '../images/logo.gif'

export default function Splash({ onLoadComplete }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleLoad = () => {
    setImageLoaded(true)
    onLoadComplete()
  }

  const handleError = () => {
    setImageError(true)
    // Still complete loading even on error to not block the app
    setTimeout(onLoadComplete, 1000)
  }

  return (
    <div className="splash-screen">
      {!imageLoaded && !imageError && (
        <div className="splash-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      {imageError && (
        <div className="splash-error">
          <p>加载失败，请刷新页面qwq</p>
        </div>
      )}
      <img 
        src={logo} 
        alt="白塔纪事工作室" 
        onLoad={handleLoad}
        onError={handleError}
        className="splash-logo"
        fetchPriority="high"
        decoding="async"
        style={{ opacity: imageLoaded ? 1 : 0 }}
      />
    </div>
  )
}