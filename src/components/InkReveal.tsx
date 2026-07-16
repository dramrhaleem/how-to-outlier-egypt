import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'

interface InkRevealProps {
  maskColor?: [number, number, number]
  brushSize?: number
  lifetime?: number
  className?: string
  style?: CSSProperties
}

interface Stamp {
  x: number
  y: number
  born: number
  seed: number
  rmax: number
}

export function InkReveal({
  maskColor = [15, 15, 16],
  brushSize = 150,
  lifetime = 850,
  className,
  style,
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stampsRef = useRef<Stamp[]>([])
  const runningRef = useRef(false)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const dimsRef = useRef({ w: 0, h: 0 })
  const [enabled, setEnabled] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !reduced.matches)
    update()
    fine.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  const resize = useCallback(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = parent.getBoundingClientRect()
    dimsRef.current = { w: rect.width, h: rect.height }
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = `rgb(${maskColor.join(',')})`
    ctx.fillRect(0, 0, rect.width, rect.height)
  }, [enabled, maskColor])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  const paint = useCallback(
    (ctx: CanvasRenderingContext2D, stamp: Stamp, now: number) => {
      const t = (now - stamp.born) / lifetime
      if (t >= 1) return false
      const eased = 1 - (1 - t) ** 3
      const radius = 12 + (stamp.rmax - 12) * eased
      const gradient = ctx.createRadialGradient(stamp.x, stamp.y, radius * 0.18, stamp.x, stamp.y, radius)
      gradient.addColorStop(0, `rgba(0,0,0,${0.98 - t * 0.25})`)
      gradient.addColorStop(0.56, `rgba(0,0,0,${0.86 - t * 0.4})`)
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      const segments = 36
      for (let index = 0; index <= segments; index += 1) {
        const angle = (index / segments) * Math.PI * 2
        const wobble = 0.8 + 0.13 * Math.sin(angle * 3 + stamp.seed) + 0.07 * Math.sin(angle * 7 + stamp.seed * 1.9)
        const x = stamp.x + Math.cos(angle) * radius * wobble
        const y = stamp.y + Math.sin(angle) * radius * wobble
        if (index === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      return true
    },
    [lifetime],
  )

  const loop = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const { w, h } = dimsRef.current
    const now = performance.now()
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = `rgb(${maskColor.join(',')})`
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'destination-out'
    stampsRef.current = stampsRef.current.filter((stamp) => paint(ctx, stamp, now))
    if (stampsRef.current.length) requestAnimationFrame(loop)
    else runningRef.current = false
  }, [maskColor, paint])

  const addStamp = useCallback(
    (x: number, y: number) => {
      if (stampsRef.current.length > 180) stampsRef.current.shift()
      stampsRef.current.push({ x, y, born: performance.now(), seed: Math.random() * Math.PI * 2, rmax: brushSize * (0.65 + Math.random() * 0.35) })
      if (!runningRef.current) {
        runningRef.current = true
        requestAnimationFrame(loop)
      }
    },
    [brushSize, loop],
  )

  const position = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  const handleMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const next = position(event)
    const last = lastPosRef.current
    if (!last) addStamp(next.x, next.y)
    else {
      const distance = Math.hypot(next.x - last.x, next.y - last.y)
      const steps = Math.max(1, Math.ceil(distance / 12))
      for (let index = 1; index <= steps; index += 1) {
        addStamp(last.x + ((next.x - last.x) * index) / steps, last.y + ((next.y - last.y) * index) / steps)
      }
    }
    lastPosRef.current = next
  }

  if (dismissed) return null

  return (
    <>
      {enabled && (
        <canvas
          ref={canvasRef}
          className={className}
          style={style}
          aria-hidden="true"
          onPointerEnter={handleMove}
          onPointerMove={handleMove}
          onPointerLeave={() => {
            lastPosRef.current = null
          }}
        />
      )}
      {!enabled && (
        <button className="ink-touch-reveal" type="button" onClick={() => setDismissed(true)}>
          اضغط علشان تكشف الحقيقة
        </button>
      )}
    </>
  )
}

