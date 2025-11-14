import React, { useState, useEffect, Suspense, lazy } from 'react'
import data from './data'
import NavBar from './components/NavBar'
import StudioHeader from './components/StudioHeader'
const Projects = lazy(() => import('./components/Projects'))
const SocialLinks = lazy(() => import('./components/SocialLinks'))
import Footer from './components/Footer'
import Splash from './components/Splash'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // When loading completes, show content shortly after. Keep a small delay to allow the splash exit animation,
    // but keep it short so mobile users don't wait too long.
    if (!isLoading) {
      // keep the splash visible for 2.5s before showing main content
      const timer = setTimeout(() => setShowContent(true), 3500)
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
            <Suspense fallback={<div style={{padding:'2rem',textAlign:'center'}}>加载中…</div>}>
              <Projects items={data.projects} />
            </Suspense>
          </section>
          <section id="contact">
            <h2>关注我们</h2>
            <Suspense fallback={<div style={{padding:'1rem',textAlign:'center'}}>加载中…</div>}>
              <SocialLinks links={data.social} />
            </Suspense>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
