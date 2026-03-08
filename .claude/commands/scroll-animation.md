# Scroll Animation from Video

Create an Apple-style scroll-scrubbed canvas animation from an MP4 file. The subject is
isolated from the background and each frame is driven by scroll position.

**Image format**: WebP with alpha — ~60% smaller than PNG, natively transparent, universally
supported (Chrome 23+, Firefox 65+, Safari 14+, Edge 18+).

---

## Prerequisites Check

```bash
ffmpeg -version | head -1
rembg --version 2>/dev/null || echo "rembg NOT INSTALLED"
cwebp -version 2>/dev/null || echo "cwebp NOT INSTALLED (part of libwebp)"
```

Install missing tools:
```bash
# rembg — background removal
pip install "rembg[cli]"
# Or isolated:
pipx install "rembg[cli]"

# libwebp — cwebp CLI for fine-grained WebP encoding
brew install webp          # macOS
# sudo apt install webp    # Ubuntu/Debian
```

---

## Workflow

### Step 1 — Probe the video

Always probe before extracting so you can calculate the correct frame step:

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=nb_frames,r_frame_rate,duration,width,height \
  -of json "$INPUT_MP4"
```

From the output:
- `nb_frames` → total frame count
- Calculate `STEP = floor(nb_frames / TARGET_FRAMES)`
- Default `TARGET_FRAMES`: **120** for desktop, **80** for mobile-only

---

### Step 2 — Extract frames as PNG (rembg input)

Extract **two resolution tiers** — desktop and mobile. rembg needs PNG input (not WebP —
rembg does not support WebP input).

```bash
mkdir -p public/frames-raw/desktop public/frames-raw/mobile

# Desktop tier — 1200px wide
ffmpeg -i "$INPUT_MP4" \
  -vf "select='not(mod(n\,${STEP}))',scale=1200:-2" \
  -vsync vfr -frames:v 120 -q:v 2 \
  "public/frames-raw/desktop/frame_%04d.png"

# Mobile tier — 640px wide (halved for 2× retina phones)
ffmpeg -i "$INPUT_MP4" \
  -vf "select='not(mod(n\,${STEP}))',scale=640:-2" \
  -vsync vfr -frames:v 80 -q:v 2 \
  "public/frames-raw/mobile/frame_%04d.png"
```

> `scale=W:-2` ensures height is divisible by 2 (required by some codec filters).
> Use PNG here — lossless input avoids compression halos that rembg picks up as subject edges.

---

### Step 3 — Remove backgrounds with rembg

```bash
mkdir -p public/frames-png/desktop public/frames-png/mobile

# Desktop frames
rembg p public/frames-raw/desktop/ public/frames-png/desktop/

# Mobile frames
rembg p public/frames-raw/mobile/ public/frames-png/mobile/

# First run downloads the model (~170MB) to ~/.u2net/ — subsequent runs are instant
```

**Choose the right model** with `-m`:

| Subject | Model flag | Notes |
|---|---|---|
| People (default) | *(omit -m)* `u2net` | Good general human segmentation |
| People (best quality) | `-m u2net_human_seg` | Recommended for portraits |
| Products / objects | `-m isnet-general-use` | Better hard edges |
| Speed priority | `-m silueta` | 2× faster, slightly lower quality |

Example with explicit model:
```bash
rembg p -m u2net_human_seg public/frames-raw/desktop/ public/frames-png/desktop/
```

---

### Step 4 — Convert PNG → WebP (with alpha)

Use `cwebp` for the best alpha-channel WebP encoding. ffmpeg's libwebp encoder does not
handle alpha as efficiently as the reference `cwebp` encoder.

```bash
mkdir -p public/frames/desktop public/frames/mobile

# Desktop — quality 82, alpha quality 90
for f in public/frames-png/desktop/*.png; do
  base=$(basename "$f" .png)
  cwebp -q 82 -alpha_q 90 -m 6 "$f" -o "public/frames/desktop/${base}.webp"
done

# Mobile — slightly more aggressive compression
for f in public/frames-png/mobile/*.png; do
  base=$(basename "$f" .png)
  cwebp -q 78 -alpha_q 85 -m 6 "$f" -o "public/frames/mobile/${base}.webp"
done
```

**cwebp flags:**
- `-q 82` — lossy quality 0-100 (80-85 is visually lossless for photographic subjects)
- `-alpha_q 90` — alpha channel quality (keep high to avoid edge fringing)
- `-m 6` — compression method 0-6 (6 = smallest file, slower encode — fine for one-time build)

**Verify size savings:**
```bash
du -sh public/frames-png/desktop/ public/frames/desktop/
# Typical: PNG ~4MB total → WebP ~1.4MB total (65% reduction)
```

---

### Step 5 — Count frames and verify

```bash
ls public/frames/desktop/ | wc -l   # should equal TARGET_FRAMES (120)
ls public/frames/mobile/  | wc -l   # should equal mobile TARGET_FRAMES (80)

# Preview first frame (macOS)
open public/frames/desktop/frame_0001.webp
```

---

### Step 6 — Create the Vue component

Ask the user:
- **Component name** — e.g. `ScrollAnimation`
- **File path** — e.g. `src/components/ScrollAnimation.vue`
- **Sticky height** — how many `vh` to pin while scrubbing (default: `400vh`)
- **Canvas intrinsic dimensions** — from the actual frame dimensions (e.g. `1200 × 800`)

Generate at the specified path:

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ─── Config ───────────────────────────────────────────────────────────────────
// Replace these with actual values after running the pipeline
const DESKTOP_FRAMES  = 120              // ls public/frames/desktop | wc -l
const MOBILE_FRAMES   = 80               // ls public/frames/mobile  | wc -l
const CANVAS_W        = 1200             // intrinsic pixel width of desktop frames
const CANVAS_H        = 800              // intrinsic pixel height (maintain aspect ratio)
const MOBILE_BREAKPT  = 768              // px — switch to mobile frame set below this
const LERP_FACTOR     = 0.14             // easing speed (lower = smoother/slower)

// ─── Responsive frame set selection ───────────────────────────────────────────
// Chosen once at mount — avoids constant matchMedia polling during scroll
const isMobile        = typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPT
const FRAME_COUNT     = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES
const FRAME_PATH      = isMobile ? '/frames/mobile/' : '/frames/desktop/'

// ─── State ────────────────────────────────────────────────────────────────────
const canvasRef       = ref<HTMLCanvasElement | null>(null)
const containerRef    = ref<HTMLDivElement | null>(null)
const loadProgress    = ref(0)            // 0-100, drives optional loading bar
const isReady         = ref(false)

// Use ImageBitmap[] — GPU-decoded, faster drawImage than HTMLImageElement
const bitmaps         = new Array<ImageBitmap | null>(FRAME_COUNT).fill(null)
let rafId             : number | null = null
let currentFrame      = 0
let targetFrame       = 0
let observer          : IntersectionObserver | null = null
let resizeObserver    : ResizeObserver | null = null

// ─── Canvas DPR sizing ────────────────────────────────────────────────────────
// Cap at 2× — 3× retina has negligible visual gain but 2.25× more pixels to decode
function sizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr     = Math.min(window.devicePixelRatio ?? 1, 2)
  const cssW    = canvas.clientWidth
  const cssH    = canvas.clientHeight
  canvas.width  = Math.round(cssW * dpr)
  canvas.height = Math.round(cssH * dpr)
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
}

// ─── Prioritised frame loading ────────────────────────────────────────────────
// Load frame 0 immediately (visible on entry), then keyframes, then fill gaps.
// Uses createImageBitmap() — decodes off the main thread, avoids layout jank.
async function loadFrames() {
  const loadOne = async (i: number): Promise<void> => {
    const index = String(i + 1).padStart(4, '0')
    try {
      const res = await fetch(`${FRAME_PATH}frame_${index}.webp`)
      const blob = await res.blob()
      bitmaps[i] = await createImageBitmap(blob)
      loadProgress.value = Math.round(((bitmaps.filter(Boolean).length) / FRAME_COUNT) * 100)
      if (i === 0) {
        isReady.value = true
        drawFrame(0)
      }
    } catch {
      // Frame failed to load — leave null, drawFrame skips nulls gracefully
    }
  }

  // Priority 1: frame 0 — show immediately
  await loadOne(0)

  // Priority 2: keyframes spread across the sequence (loads visible frame fast on first scroll)
  const keyframes = [
    Math.floor(FRAME_COUNT * 0.25),
    Math.floor(FRAME_COUNT * 0.5),
    Math.floor(FRAME_COUNT * 0.75),
    FRAME_COUNT - 1,
  ]
  await Promise.all(keyframes.map(loadOne))

  // Priority 3: all remaining frames — use requestIdleCallback to avoid blocking
  const remaining = Array.from({ length: FRAME_COUNT }, (_, i) => i)
    .filter(i => !bitmaps[i])

  const loadInChunks = (items: number[], chunkSize = 10) => {
    if (!items.length) return
    const chunk = items.splice(0, chunkSize)
    Promise.all(chunk.map(loadOne)).then(() => {
      if (items.length) {
        ;('requestIdleCallback' in window
          ? window.requestIdleCallback
          : (cb: () => void) => setTimeout(cb, 16)
        )(() => loadInChunks(items, chunkSize))
      }
    })
  }
  loadInChunks(remaining)
}

// ─── Drawing ──────────────────────────────────────────────────────────────────
function drawFrame(index: number) {
  const canvas = canvasRef.value
  const bitmap = bitmaps[index]
  if (!canvas || !bitmap) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Use CSS dimensions for draw size (canvas is already DPR-scaled via sizeCanvas)
  const w = canvas.clientWidth
  const h = canvas.clientHeight

  ctx.clearRect(0, 0, w, h)

  // Center + contain: maintain aspect ratio within canvas
  const scale  = Math.min(w / CANVAS_W, h / CANVAS_H)
  const drawW  = CANVAS_W * scale
  const drawH  = CANVAS_H * scale
  const offsetX = (w - drawW) / 2
  const offsetY = (h - drawH) / 2

  ctx.drawImage(bitmap, offsetX, offsetY, drawW, drawH)
}

// ─── RAF animation loop ───────────────────────────────────────────────────────
let lastDrawnFrame = -1

function animationLoop() {
  currentFrame += (targetFrame - currentFrame) * LERP_FACTOR
  const frameIndex = Math.round(currentFrame)

  // Only redraw when frame index actually changes — avoids unnecessary clearRect/drawImage
  if (frameIndex !== lastDrawnFrame) {
    drawFrame(frameIndex)
    lastDrawnFrame = frameIndex
  }

  rafId = requestAnimationFrame(animationLoop)
}

// ─── Scroll handler ───────────────────────────────────────────────────────────
function handleScroll() {
  const container = containerRef.value
  if (!container) return

  const { top }       = container.getBoundingClientRect()
  const scrollable    = container.offsetHeight - window.innerHeight
  const progress      = Math.max(0, Math.min(1, -top / scrollable))
  targetFrame         = Math.min(Math.floor(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1)
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  sizeCanvas()

  // ResizeObserver — re-scale canvas if viewport changes (orientation flip, resize)
  resizeObserver = new ResizeObserver(() => {
    sizeCanvas()
    drawFrame(Math.round(currentFrame))
  })
  if (canvasRef.value) resizeObserver.observe(canvasRef.value)

  // IntersectionObserver — only start loading when section enters viewport
  // Prevents downloading 5MB of frames for a section the user may never reach
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) loadFrames() },
    { rootMargin: '200px' }   // start loading 200px before section enters viewport
  )
  if (containerRef.value) observer.observe(containerRef.value)

  window.addEventListener('scroll', handleScroll, { passive: true })
  rafId = requestAnimationFrame(animationLoop)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (rafId !== null) cancelAnimationFrame(rafId)
  observer?.disconnect()
  resizeObserver?.disconnect()

  // Free GPU memory — ImageBitmap holds decoded texture memory until explicitly closed
  bitmaps.forEach(b => b?.close())
})
</script>

<template>
  <!--
    Container height = scroll budget. 400vh means the user scrolls 4 full screens
    to go from frame 0 to frame N. Increase for a slower, more cinematic scrub.
  -->
  <div ref="containerRef" class="sa-container">

    <!-- Optional loading progress bar — remove if unwanted -->
    <div
      v-if="!isReady"
      class="sa-loader"
      :style="{ '--progress': `${loadProgress}%` }"
      aria-hidden="true"
    />

    <div class="sa-sticky">
      <canvas
        ref="canvasRef"
        class="sa-canvas"
        :class="{ 'sa-canvas--ready': isReady }"
        :style="{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }"
        aria-hidden="true"
        role="img"
      />
    </div>
  </div>
</template>

<style scoped>
.sa-container {
  position: relative;
  height: 400vh;   /* ← tune: more vh = slower scrub */
  width: 100%;
}

.sa-sticky {
  position: sticky;
  top: 0;
  height: 100svh;  /* svh = small viewport height — correct on mobile with browser chrome */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.sa-canvas {
  display: block;
  width: 100%;
  max-width: 1200px;
  height: auto;
  /* Hint browser to promote to compositor layer — avoids repaint on drawImage */
  will-change: contents;
  /* Fade in once first frame is ready */
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sa-canvas--ready {
  opacity: 1;
}

/* Loading bar */
.sa-loader {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  width: var(--progress, 0%);
  background: currentColor;
  opacity: 0.4;
  transition: width 0.2s ease;
  pointer-events: none;
  z-index: 9999;
}

/* Reduced-motion: show static first frame, no sticky scroll effect */
@media (prefers-reduced-motion: reduce) {
  .sa-container {
    height: auto;
  }
  .sa-sticky {
    position: relative;
    height: auto;
  }
  .sa-canvas {
    will-change: auto;
    opacity: 1;
  }
}

/* Mobile: narrower max-width, full-width canvas */
@media (max-width: 767px) {
  .sa-canvas {
    max-width: 100%;
  }
}
</style>
```

---

### Step 7 — Wire into the page

```vue
<script setup lang="ts">
import ScrollAnimation from '@/components/ScrollAnimation.vue'
</script>

<template>
  <section>
    <div class="intro">Scroll to animate</div>
    <ScrollAnimation />
    <div class="outro">Done</div>
  </section>
</template>
```

---

## Complete pipeline (copy-paste reference)

```bash
# ── 0. Install deps (once) ───────────────────────────────────────────────────
pip install "rembg[cli]"
brew install ffmpeg webp

# ── 1. Probe video ────────────────────────────────────────────────────────────
ffprobe -v error -select_streams v:0 \
  -show_entries stream=nb_frames,r_frame_rate,duration,width,height \
  -of json input.mp4

# ── 2. Extract PNG frames (two tiers) ────────────────────────────────────────
mkdir -p public/frames-raw/desktop public/frames-raw/mobile

ffmpeg -i input.mp4 \
  -vf "select='not(mod(n\,STEP))',scale=1200:-2" \
  -vsync vfr -frames:v 120 -q:v 2 \
  "public/frames-raw/desktop/frame_%04d.png"

ffmpeg -i input.mp4 \
  -vf "select='not(mod(n\,STEP))',scale=640:-2" \
  -vsync vfr -frames:v 80 -q:v 2 \
  "public/frames-raw/mobile/frame_%04d.png"

# ── 3. Remove backgrounds ─────────────────────────────────────────────────────
mkdir -p public/frames-png/desktop public/frames-png/mobile

rembg p -m u2net_human_seg \
  public/frames-raw/desktop/ public/frames-png/desktop/

rembg p -m u2net_human_seg \
  public/frames-raw/mobile/  public/frames-png/mobile/

# ── 4. Convert to WebP with alpha ─────────────────────────────────────────────
mkdir -p public/frames/desktop public/frames/mobile

for f in public/frames-png/desktop/*.png; do
  base=$(basename "$f" .png)
  cwebp -q 82 -alpha_q 90 -m 6 "$f" -o "public/frames/desktop/${base}.webp"
done

for f in public/frames-png/mobile/*.png; do
  base=$(basename "$f" .png)
  cwebp -q 78 -alpha_q 85 -m 6 "$f" -o "public/frames/mobile/${base}.webp"
done

# ── 5. Verify counts ──────────────────────────────────────────────────────────
echo "Desktop: $(ls public/frames/desktop/ | wc -l) frames"
echo "Mobile:  $(ls public/frames/mobile/  | wc -l) frames"

# ── 6. Check size savings ─────────────────────────────────────────────────────
du -sh public/frames-png/desktop/ public/frames/desktop/
du -sh public/frames-png/mobile/  public/frames/mobile/
```

---

## Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Canvas stays blank | Frames not in `/public` | Vite serves `/public` at root — path must be `/frames/...` not `src/...` |
| White halo around subject | u2net picking up JPEG artifacts | Already handled — pipeline uses PNG input |
| Subject fringing on edges | Default model quality | Switch to `-m u2net_human_seg` or `-m isnet-general-use` |
| Jerky at fast scroll speeds | Lerp too slow | Increase `LERP_FACTOR` to `0.2`; or reduce it to `0.08` for smoother feel |
| Frames load slowly on mobile | Large desktop WebP served to mobile | Confirm `isMobile` branch is hitting `/frames/mobile/` |
| rembg is slow | CPU inference | Use `rembg[gpu]` with CUDA; or `-m silueta` for 2× speed |
| Canvas blurry on retina | DPR not applied | `sizeCanvas()` handles this — ensure it's called in `onMounted` |
| Off-by-one at end | Frame count mismatch | Re-count with `ls ... | wc -l` and update `DESKTOP_FRAMES` / `MOBILE_FRAMES` |
| `createImageBitmap` throws | Safari < 15 | Add `try/catch` fallback: `const img = new Image(); img.src = url` |
| Memory usage grows | ImageBitmaps not closed | `onUnmounted` closes all — ensure component is properly destroyed |
