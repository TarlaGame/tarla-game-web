import React from 'react'

export default function SocialLinks({ links }){
  return (
    <div className="social-list">
      {links.map(l => (
        <a key={l.id} className="social-item" href={l.url} target="_blank" rel="noreferrer" aria-label={l.label}>
          {l.label}
        </a>
      ))}
    </div>
  )
}
