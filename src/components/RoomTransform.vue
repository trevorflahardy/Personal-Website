<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ─── Config ───────────────────────────────────────────────────────────────────
const DESKTOP_FRAMES = 120
const MOBILE_FRAMES  = 60
const CANVAS_W       = 1080
const CANVAS_H       = 1080
const ZOOM           = 1.35  // zoom in to trim transparent padding around the room
const MOBILE_BP      = 768   // px
const LERP           = 0.13

// ─── Narrative waypoints ──────────────────────────────────────────────────────
// Each label fades in at `from` and fades out at `to` (0–1 scroll progress)
const waypoints = [
  { from: 0.00, to: 0.28, headline: 'A space to think.',       sub: 'Every setup starts somewhere.' },
  { from: 0.30, to: 0.62, headline: 'Then it started changing.', sub: 'Piece by piece, intentionally.' },
  { from: 0.68, to: 1.00, headline: 'Code, bloom, repeat.',    sub: 'This is where I live and work.' },
]

// ─── Responsive tier selection (chosen once at mount) ─────────────────────────
const isMobile    = typeof window !== 'undefined' && window.innerWidth < MOBILE_BP
const FRAME_COUNT = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES
const BASE       = import.meta.env.BASE_URL.replace(/\/$/, '')
const FRAME_PATH = isMobile
  ? `${BASE}/room-transform/mobile/`
  : `${BASE}/room-transform/desktop/`

// ─── Refs ─────────────────────────────────────────────────────────────────────
const canvasRef      = ref<HTMLCanvasElement | null>(null)
const containerRef   = ref<HTMLDivElement | null>(null)
const isReady        = ref(false)
const loadProgress   = ref(0)
const scrollProgress = ref(0)   // 0–1, exposed for parent if needed

// ─── Internal state ───────────────────────────────────────────────────────────
const bitmaps   = new Array<ImageBitmap | null>(FRAME_COUNT).fill(null)
let rafId       : number | null = null
let observer    : IntersectionObserver | null = null
let resizeObs   : ResizeObserver | null = null
let scrollEl    : HTMLElement | null = null
let currentF    = 0
let targetF     = 0
let lastDrawnF  = -1

// ─── Canvas DPR sizing ────────────────────────────────────────────────────────
function sizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr  = Math.min(window.devicePixelRatio ?? 1, 2)
  const cssW = canvas.clientWidth
  const cssH = canvas.clientHeight
  canvas.width  = Math.round(cssW * dpr)
  canvas.height = Math.round(cssH * dpr)
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
    // Redraw current frame after resize
    if (lastDrawnF >= 0) drawFrame(lastDrawnF)
  }
}

// ─── Frame loading ────────────────────────────────────────────────────────────
async function loadFrames() {
  const loadOne = async (i: number) => {
    const idx = String(i + 1).padStart(4, '0')
    try {
      const res  = await fetch(`${FRAME_PATH}frame_${idx}.webp`)
      const blob = await res.blob()
      bitmaps[i] = await createImageBitmap(blob)
      loadProgress.value = Math.round(
        (bitmaps.filter(Boolean).length / FRAME_COUNT) * 100
      )
      if (i === 0) { isReady.value = true; drawFrame(0) }
    } catch { /* leave null — drawFrame skips nulls */ }
  }

  // Frame 0 first — visible immediately on entry
  await loadOne(0)

  // Keyframes spread across the sequence (fast scrub responsiveness)
  await Promise.all([
    Math.floor(FRAME_COUNT * 0.25),
    Math.floor(FRAME_COUNT * 0.5),
    Math.floor(FRAME_COUNT * 0.75),
    FRAME_COUNT - 1,
  ].map(loadOne))

  // Remaining frames in idle-time chunks
  const remaining = Array.from({ length: FRAME_COUNT }, (_, i) => i)
    .filter(i => !bitmaps[i])

  const loadChunks = (items: number[], size = 8) => {
    if (!items.length) return
    const chunk = items.splice(0, size)
    Promise.all(chunk.map(loadOne)).then(() => {
      if (items.length) {
        ;('requestIdleCallback' in window
          ? window.requestIdleCallback
          : (cb: () => void) => setTimeout(cb, 16)
        )(() => loadChunks(items, size))
      }
    })
  }
  loadChunks(remaining)
}

// ─── Drawing ──────────────────────────────────────────────────────────────────
function drawFrame(index: number) {
  const canvas = canvasRef.value
  const bitmap = bitmaps[index]
  if (!canvas || !bitmap) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = canvas.clientWidth
  const h = canvas.clientHeight

  ctx.clearRect(0, 0, w, h)

  // Contain: preserve aspect ratio, center in canvas
  const scale   = Math.min(w / CANVAS_W, h / CANVAS_H) * ZOOM
  const drawW   = CANVAS_W * scale
  const drawH   = CANVAS_H * scale
  const offsetX = (w - drawW) / 2
  const offsetY = (h - drawH) / 2

  ctx.drawImage(bitmap, offsetX, offsetY, drawW, drawH)
}

// ─── RAF loop ─────────────────────────────────────────────────────────────────
function loop() {
  currentF += (targetF - currentF) * LERP
  const fi = Math.round(currentF)
  if (fi !== lastDrawnF) {
    drawFrame(fi)
    lastDrawnF = fi
  }
  rafId = requestAnimationFrame(loop)
}

// ─── Scroll handler — attaches to #main-content, not window ──────────────────
function handleScroll() {
  const container = containerRef.value
  if (!container || !scrollEl) return

  const rect       = container.getBoundingClientRect()
  const scrollable = container.offsetHeight - scrollEl.clientHeight
  const progress   = Math.max(0, Math.min(1, -rect.top / scrollable))

  scrollProgress.value = progress
  targetF = Math.min(Math.floor(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1)
}

// ─── Waypoint opacity helper ──────────────────────────────────────────────────
// Returns 0–1 opacity for a waypoint given current scroll progress.
// Fades in over 5% and out over 5% of total range.
function waypointOpacity(wp: typeof waypoints[0], progress: number): number {
  const FADE = 0.05
  if (progress < wp.from || progress > wp.to) return 0
  const inFade  = Math.min(1, (progress - wp.from) / FADE)
  const outFade = Math.min(1, (wp.to - progress) / FADE)
  return Math.min(inFade, outFade)
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  scrollEl = document.getElementById('main-content')
  sizeCanvas()

  resizeObs = new ResizeObserver(() => sizeCanvas())
  if (canvasRef.value) resizeObs.observe(canvasRef.value)

  // Only start loading when section is near viewport
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) loadFrames() },
    { root: scrollEl, rootMargin: '200px' }
  )
  if (containerRef.value) observer.observe(containerRef.value)

  scrollEl?.addEventListener('scroll', handleScroll, { passive: true })
  rafId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  scrollEl?.removeEventListener('scroll', handleScroll)
  if (rafId !== null) cancelAnimationFrame(rafId)
  observer?.disconnect()
  resizeObs?.disconnect()
  bitmaps.forEach(b => b?.close())
})

defineExpose({ scrollProgress })
</script>

<template>
  <!--
    Container height = scroll budget. 350vh = user spends ~3.5 screens
    scrubbing from frame 0 to frame 96. Tune to taste.
  -->
  <div ref="containerRef" class="rt-container">

    <div class="rt-sticky">
      <!-- Canvas -->
      <canvas
        ref="canvasRef"
        class="rt-canvas"
        :class="{ 'rt-canvas--ready': isReady }"
        :style="{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }"
        aria-hidden="true"
      />

      <!-- Loading bar (disappears once all frames loaded) -->
      <div
        v-if="loadProgress < 100"
        class="rt-loader"
        :style="{ width: `${loadProgress}%` }"
        aria-hidden="true"
      />

      <!-- Narrative overlays — fade at waypoint thresholds -->
      <div
        v-for="(wp, i) in waypoints"
        :key="i"
        class="rt-caption"
        :style="{ opacity: waypointOpacity(wp, scrollProgress) }"
        aria-hidden="true"
      >
        <p class="rt-caption-headline">{{ wp.headline }}</p>
        <p class="rt-caption-sub">{{ wp.sub }}</p>
      </div>

      <!-- Scroll cue — fades out once user starts scrolling -->
      <div
        class="rt-scroll-cue"
        :style="{ opacity: Math.max(0, 1 - scrollProgress * 8) }"
        aria-hidden="true"
      >
        <i class="pi pi-angle-double-down" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.rt-container {
  position: relative;
  height: 350vh;
  width: 100%;
}

.rt-sticky {
  position: sticky;
  top: 0;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Canvas */
.rt-canvas {
  display: block;
  width: 100%;
  max-width: 1280px;
  height: 100%;
  object-fit: contain;
  will-change: contents;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.rt-canvas--ready {
  opacity: 1;
}

/* Thin loading bar at top */
.rt-loader {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.35);
  transition: width 0.25s ease;
  pointer-events: none;
}

/* Narrative caption — bottom-left, over the canvas */
.rt-caption {
  position: absolute;
  bottom: clamp(1.5rem, 5vh, 3rem);
  left: clamp(1.25rem, 4vw, 3rem);
  pointer-events: none;
  transition: opacity 0.1s linear;
  max-width: 28ch;
}

.rt-caption-headline {
  font-size: clamp(1rem, 2.5vw, 1.375rem);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.25;
  margin: 0 0 0.3em;
  text-shadow: 0 1px 12px rgba(0,0,0,0.6);
  letter-spacing: -0.01em;
}

.rt-caption-sub {
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
  text-shadow: 0 1px 8px rgba(0,0,0,0.5);
  letter-spacing: 0.01em;
}

/* Scroll cue bounce animation */
.rt-scroll-cue {
  position: absolute;
  bottom: clamp(1.5rem, 5vh, 3rem);
  right: clamp(1.25rem, 4vw, 3rem);
  color: rgba(255,255,255,0.4);
  font-size: 1.25rem;
  animation: bounce 1.6s ease-in-out infinite;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}

/* Reduced motion: collapse to static frame, no sticky */
@media (prefers-reduced-motion: reduce) {
  .rt-container     { height: auto; }
  .rt-sticky        { position: relative; height: auto; padding: 2rem 0; }
  .rt-canvas        { will-change: auto; }
  .rt-scroll-cue    { display: none; }
  .rt-caption       { opacity: 1 !important; }
}

@media (max-width: 767px) {
  .rt-canvas { max-width: 100%; }
}
</style>
