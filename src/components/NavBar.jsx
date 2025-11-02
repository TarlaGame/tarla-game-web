import React, { useState } from 'react'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#top" aria-label="回到顶部" />

        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          <a href="#projects" onClick={() => setOpen(false)}>项目</a>
          <a href="#contact" onClick={() => setOpen(false)}>关注我们</a>
        </div>
      </div>
    </nav>
  )
}
