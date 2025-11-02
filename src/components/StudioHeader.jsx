import React, { useEffect, useRef } from 'react'
import titleImage from '../images/title.png'

export default function StudioHeader({ info }) {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header className="header">
      <div className="hero-image" style={{ backgroundImage: `url(${titleImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className="hero-overlay" />
        <div className="hero-content" ref={titleRef}>
          <h1 className="header-title">{info.name}</h1>
          <p className="header-tag">{info.tagline}</p>
        </div>
      </div>
      <div className="header-details">
        <div className="header-inner">
          <div className="header-left">
            <p className="header-desc">{info.description}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
