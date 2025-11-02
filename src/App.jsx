import React, { useState, useEffect } from 'react'
import data from './data'
import NavBar from './components/NavBar'
import StudioHeader from './components/StudioHeader'
import Projects from './components/Projects'
import SocialLinks from './components/SocialLinks'
import Footer from './components/Footer'
import Splash from './components/Splash'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // 当 isLoading 变为 false 后，等待时间再显示内容
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 4000) // 4秒延迟，对应 logo 动画时长
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  // No scroll-reveal animations — intentionally left blank

  return (
    <>
      {!showContent && (
        <Splash onLoadComplete={() => setIsLoading(false)} />
      )}
      <div className={`app ${showContent ? 'app-visible' : ''}`}>
        <NavBar />
        <StudioHeader info={data.studio} />
        <main className="container">
          <section id="projects">
            <h2>游戏</h2>
            <Projects items={data.projects} />
          </section>
          <section id="contact">
            <h2>关注我们</h2>
            <SocialLinks links={data.social} />
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
