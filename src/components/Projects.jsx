import React from 'react'

function ProjectCard({ p }) {
  return (
    <article className="card">
      <h3>{p.name}</h3>
      <p>{p.short}</p>
      <p style={{color:'var(--muted)'}}>{p.description}</p>
      <div className="tags" style={{marginTop:8}}>
        {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
      </div>
      <div style={{marginTop:10}}>
        <a className="social-item" href={p.url}>查看项目</a>
      </div>
    </article>
  )
}

export default function Projects({ items }){
  return (
    <div className="grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:16}}>
      {items.map(p => <ProjectCard key={p.id} p={p} />)}
    </div>
  )
}
