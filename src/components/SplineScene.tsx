import { Component, lazy, Suspense, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

interface BoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface BoundaryState {
  failed: boolean
}

class SceneBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false }

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.warn('Spline scene failed to load', error, info)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function ScenePlaceholder({ failed = false, reduced = false }: { failed?: boolean; reduced?: boolean }) {
  return (
    <div className="scene-placeholder" role="status">
      {!failed && !reduced && <Sparkles size={19} aria-hidden="true" />}
      <span>{failed ? 'تعذّر تحميل المشهد الثلاثي' : reduced ? 'المشهد متوقف احترامًا لإعداد تقليل الحركة' : 'لحظة هادئة… NEXBOT في الطريق'}</span>
    </div>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!host || reducedMotion) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setInView(true), 320)
          observer.disconnect()
        }
      },
      { rootMargin: '180px' },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div ref={hostRef} className={className}>
      {reducedMotion ? (
        <ScenePlaceholder reduced />
      ) : (
        <>
          {inView && (
            <SceneBoundary fallback={<ScenePlaceholder failed />}>
              <Suspense fallback={null}>
                <Spline
                  scene={scene}
                  className={`spline-canvas ${sceneReady ? 'spline-canvas--ready' : ''}`}
                  onLoad={() => window.requestAnimationFrame(() => setSceneReady(true))}
                />
              </Suspense>
            </SceneBoundary>
          )}
          {!sceneReady && <ScenePlaceholder />}
        </>
      )}
    </div>
  )
}
