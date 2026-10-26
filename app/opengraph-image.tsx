import { ImageResponse } from 'next/og'

export const alt = 'SpeakFlow Escolas — Reforço escolar em casa, com retorno na hora, para cada aluno.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
          <span>Reforço escolar em casa,</span>
          <span style={{ color: '#C4B5FD' }}>com retorno na hora, para cada aluno.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#C9BFE3' }}>
          Reforço escolar com inteligência artificial para redes públicas e privadas
        </div>
      </div>
    ),
    size,
  )
}
