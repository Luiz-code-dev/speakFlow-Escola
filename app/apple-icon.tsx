import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  const bars = [30, 62, 46, 22]
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          background: '#6D28D9',
        }}
      >
        {bars.map((h, i) => (
          <div key={i} style={{ width: 16, height: h * 1.4, borderRadius: 8, background: '#FFFFFF' }} />
        ))}
      </div>
    ),
    size,
  )
}
