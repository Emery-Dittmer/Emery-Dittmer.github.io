'use client'

import { useEffect, useRef } from 'react'

interface WindCanvasProps {
  className?: string
  particleCount?: number
  speed?: number
  maxOpacity?: number
  lifeSeconds?: number
}

export default function WindCanvas({
  className = '',
  particleCount = 280,
  speed = 1.2,
  maxOpacity = 0.5,
  lifeSeconds = 4,
}: WindCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Permutation table for Perlin noise
    const arr = Array.from({ length: 256 }, (_, i) => i)
    for (let i = 255; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    const perm = new Uint8Array(512)
    for (let i = 0; i < 512; i++) perm[i] = arr[i & 255]

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
    const lerp = (a: number, b: number, t: number) => a + t * (b - a)
    const grad = (h: number, x: number, y: number) => {
      switch (h & 3) {
        case 0:  return  x + y
        case 1:  return -x + y
        case 2:  return  x - y
        default: return -x - y
      }
    }
    const noise2 = (x: number, y: number): number => {
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255
      const xf = x - Math.floor(x)
      const yf = y - Math.floor(y)
      const u = fade(xf)
      const v = fade(yf)
      const aa = perm[perm[X]     + Y]
      const ab = perm[perm[X]     + Y + 1]
      const ba = perm[perm[X + 1] + Y]
      const bb = perm[perm[X + 1] + Y + 1]
      return lerp(
        lerp(grad(aa, xf,     yf),     grad(ba, xf - 1, yf),     u),
        lerp(grad(ab, xf,     yf - 1), grad(bb, xf - 1, yf - 1), u),
        v
      )
    }

    // Resize handler
    let W = 0
    let H = 0
    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W
      canvas.height = H
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Particle pool
    const baseLife = lifeSeconds * 60
    interface Pt { x: number; y: number; age: number; life: number }
    const spawn = (): Pt => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      age:  0,
      life: baseLife,
    })
    const pts: Pt[] = Array.from({ length: particleCount }, spawn)

    const SPATIAL_SCALE = 0.0018
    const TIME_SCALE    = 0.00025
    let frame = 0
    let raf   = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      frame++

      // Fade existing pixels toward transparent (keeps page bg visible)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.04)'
      ctx.fillRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'source-over'

      for (const p of pts) {
        if (p.age >= p.life) {
          Object.assign(p, spawn())
          continue
        }

        const t     = frame * TIME_SCALE
        const angle = noise2(p.x * SPATIAL_SCALE + t, p.y * SPATIAL_SCALE + t * 0.7) * Math.PI * 4
        const dx    = Math.cos(angle) * speed
        const dy    = Math.sin(angle) * speed

        // Fade in for first 12% of life, sustain, then fade out for last 12%
        const progress = p.age / p.life
        const alpha    = maxOpacity * (
          progress < 0.12 ? progress / 0.12 :
          progress > 0.88 ? (1 - progress) / 0.12 :
          1
        )

        // Purple hue with slight spatial drift
        const hue = 258 + noise2(p.x * SPATIAL_SCALE * 1.5, p.y * SPATIAL_SCALE * 1.5) * 28
        ctx.strokeStyle = `hsla(${hue},65%,72%,${alpha})`
        ctx.lineWidth   = 0.8

        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        p.x += dx
        p.y += dy
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        // Wrap around edges
        if      (p.x < -5)    p.x += W + 5
        else if (p.x > W + 5) p.x -= W + 5
        if      (p.y < -5)    p.y += H + 5
        else if (p.y > H + 5) p.y -= H + 5

        p.age++
      }
    }

    tick()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [particleCount, speed, maxOpacity, lifeSeconds])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
    />
  )
}
