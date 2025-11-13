import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'

// Build an embeddable bilibili player URL from a video page URL
function getEmbedUrl(url){
  if(!url) return ''
  // try to find BV id like 'BV1wRyXBaEx4'
  const bvidMatch = url.match(/(BV[0-9A-Za-z]+)/)
  if(bvidMatch) return `https://player.bilibili.com/player.html?bvid=${bvidMatch[1]}&page=1`
  const bvidParam = url.match(/[?&]bvid=([^&]+)/)
  if(bvidParam) return `https://player.bilibili.com/player.html?bvid=${bvidParam[1]}&page=1`
  // fallback: return the original URL (may not embed)
  return url
}

function ProjectCard({ p }) {
  const [index, setIndex] = useState(0)
  const [openVideo, setOpenVideo] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  // build image URLs using Vite's import.meta.url
  const imgs = (p.images || []).map(img => new URL(`../images/${img}`, import.meta.url).href)
  const preview = imgs[index] || imgs[0]

  // reset load state when image changes
  React.useEffect(() => {
    setImgLoaded(false)
    setImgError(false)
  }, [preview])

  const prev = () => setIndex((i) => (i - 1 + imgs.length) % imgs.length)
  const next = () => setIndex((i) => (i + 1) % imgs.length)

  return (
    <Card className="card project-card" sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'stretch' }}>
      {preview && (
        <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={preview}
            alt={p.name}
            loading="lazy"
            decoding="async"
            width="384"
            height="216"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: imgError ? 'none' : 'block' }}
          />

          {/* Loading/placeholder overlay */}
          {(!imgLoaded || imgError) && (
            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'var(--bg-2)' }}>
              <div className="loading-spinner" />
            </Box>
          )}

          {/* Prev/next buttons: visible with gray translucent background */}
          {imgs.length > 1 && (
            <Box sx={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)' }}>
              <Button
                size="small"
                onClick={prev}
                sx={{
                  minWidth: 40,
                  minHeight: 40,
                  borderRadius: '50%',
                  bgcolor: 'rgba(60,60,60,0.45)',
                  color: '#fff',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: 'rgba(60,60,60,0.6)' }
                }}
              >&lt;</Button>
            </Box>
          )}
          {imgs.length > 1 && (
            <Box sx={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)' }}>
              <Button
                size="small"
                onClick={next}
                sx={{
                  minWidth: 40,
                  minHeight: 40,
                  borderRadius: '50%',
                  bgcolor: 'rgba(60,60,60,0.45)',
                  color: '#fff',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: 'rgba(60,60,60,0.6)' }
                }}
              >&gt;</Button>
            </Box>
          )}

          {/* indicator dots */}
          {imgs.length > 1 && (
            <Box sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 0.5 }}>
              {imgs.map((_, i) => (
                <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: i === index ? '#fff' : 'rgba(255,255,255,0.6)', border: i === index ? '1px solid rgba(0,0,0,0.15)' : 'none' }} />
              ))}
            </Box>
          )}
        </Box>
      )}

      <CardContent>
        <Typography component="h3" variant="h6">{p.name}</Typography>
        <Typography variant="subtitle2" color="text.secondary">{p.short}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>{p.description}</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
          {(p.tags || []).map(t => (
            <Box key={t} className="tag" sx={{ px: 1, py: 0.3 }}>{t}</Box>
          ))}
        </Box>
      </CardContent>

        <CardActions sx={{ p: 2 }}>
          <Box sx={{ width: '100%', display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center' }}>
            <Button
              size="medium"
              variant="contained"
              href={p.download}
              target="_blank"
              rel="noreferrer"
              sx={{
                minHeight: 44,
                width: { xs: '100%', sm: 120 },
                textTransform: 'none',
                backgroundColor: 'var(--deep-green)',
                color: '#fff',
                '&:hover': { backgroundColor: 'var(--primary-light)' }
              }}
            >下载|密码turi</Button>
            <Button
              size="medium"
              variant="outlined"
              onClick={() => setOpenVideo(true)}
              sx={{
                minHeight: 44,
                width: { xs: '100%', sm: 120 },
                textTransform: 'none',
                borderColor: 'var(--deep-green)',
                color: 'var(--deep-green)',
                '&:hover': { borderColor: 'var(--primary-light)', color: 'var(--primary-light)', backgroundColor: 'rgba(17,57,34,0.04)' }
              }}
            >预览视频</Button>
          </Box>
        </CardActions>

      {/* Video preview dialog (embedded bilibili) */}
      <Dialog open={openVideo} onClose={() => setOpenVideo(false)} fullWidth maxWidth="md">
        <DialogContent sx={{ p: 0, bgcolor: 'black' }}>
          <Box sx={{ width: '100%', aspectRatio: '16/9' }}>
            <iframe
              src={getEmbedUrl(p.video)}
              title={`${p.name} - 预览`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          </Box>
        </DialogContent>
        <IconButton aria-label="close" onClick={() => setOpenVideo(false)} sx={{ position: 'absolute', right: 8, top: 8, color: '#fff' }}>×</IconButton>
      </Dialog>
    </Card>
  )
}

export default function Projects({ items }){
  return (
    <div className="projects-grid" role="list">
      {items.map(p => (
        <ProjectCard key={p.id} p={p} />
      ))}
    </div>
  )
}
