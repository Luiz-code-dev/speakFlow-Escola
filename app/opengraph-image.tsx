import { ImageResponse } from 'next/og'

export const alt =
  'SpeakFlow Escolas — Reforço escolar que encontra onde a dificuldade começa. Inteligência artificial alinhada à BNCC.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const gradient = {
  backgroundImage: 'linear-gradient(90deg, #A78BFA, #F472B6)',
  backgroundClip: 'text',
  color: 'transparent',
} as const

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#1E1033',
          color: '#F3EFFF',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 800 }}>
          SpeakFlow<span style={{ color: '#FCE7F3', marginLeft: 12 }}>Escolas</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 72, fontWeight: 800, lineHeight: 1.08 }}>
          <span>Reforço escolar que</span>
          <span style={gradient}>encontra onde a</span>
          <div style={{ display: 'flex' }}>
            <span style={gradient}>dificuldade começa</span>
            <span>.</span>
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#C9BFE3' }}>Inteligência artificial alinhada à BNCC</div>
      </div>
    ),
    size,
  )
}
