'use client'

import { useEffect, useRef } from 'react'

type Point = { x: number; y: number; vx: number; vy: number; r: number; pink: boolean }

export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const speed = coarse ? 0.12 : 0.22
    const mouse = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let points: Point[] = []
    let raf = 0
    let inView = true
    let pageVisible = !document.hidden

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(coarse ? 40 : 75, Math.floor((width * height) / 15000))
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.6 + 1,
        pink: Math.random() < 0.3,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of points) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d = Math.hypot(dx, dy)
        if (d < 160 && d > 1) {
          p.x += (dx / d) * 0.25
          p.y += (dy / d) * 0.25
        }
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }
      for (let i = 0; i < points.length; i++) {
        const a = points[i]
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(109,40,217,${(1 - d / 130) * 0.28})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < 180) {
          ctx.strokeStyle = `rgba(219,39,119,${(1 - md / 180) * 0.45})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }
      for (const p of points) {
        ctx.fillStyle = p.pink ? 'rgba(219,39,119,0.75)' : 'rgba(109,40,217,0.7)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const sync = () => {
      cancelAnimationFrame(raf)
      if (inView && pageVisible) raf = requestAnimationFrame(draw)
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onVisibility = () => {
      pageVisible = !document.hidden
      sync()
    }

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      sync()
    })
    io.observe(canvas)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    resize()
    sync()
    if (!coarse) {
      window.addEventListener('pointermove', onPointer, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
