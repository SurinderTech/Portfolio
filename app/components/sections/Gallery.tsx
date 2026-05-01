'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// ✅ Add as many photos as you want — all cycle through the 4 physical frames
const photos = [
  { src: '/photo1.jpg', alt: 'Photo 1' },
  { src: '/photo2.jpg', alt: 'Photo 2' },
  { src: '/photo3.jpg', alt: 'Photo 3' },
  { src: '/photo4.jpg', alt: 'Photo 4' },
  { src: '/photo5.jpg', alt: 'Photo 5' },
  { src: '/photo6.jpg', alt: 'Photo 6' },
  { src: '/photo7.jpg', alt: 'Photo 7' },
  { src: '/photo8.jpg', alt: 'Photo 8' },
  { src: '/photo9.jpg', alt: 'Photo 9' },
  { src: '/photo10.jpg', alt: 'Photo 10' },
]

const FRAME_COUNT = 4
const STEP_MS = 2500

const FW = 4.0
const FH = 5.2
const FD = 0.08
const BW = 0.10
const RADIUS = 3.4
const COL_H = 8.2
const ARM_Y = 4.6

// ── HIGH QUALITY texture canvas size (matches doc2 exactly) ──────────────────
const TEX_W = 2048
const TEX_H = Math.round(TEX_W * (FH - BW * 2) / (FW - BW * 2))

/**
 * Cover-crop draw — identical to CSS object-fit: cover
 * Ensures image always fills the entire frame with no letterboxing
 */
function drawCoverCrop(ctx, img, dw, dh) {
  const srcAR = img.naturalWidth / img.naturalHeight
  const dstAR = dw / dh
  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight
  if (srcAR > dstAR) {
    sw = Math.round(img.naturalHeight * dstAR)
    sx = Math.round((img.naturalWidth - sw) / 2)
  } else {
    sh = Math.round(img.naturalWidth / dstAR)
    sy = Math.round((img.naturalHeight - sh) / 2)
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh)
}

function ChromeFrameStand() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    const W = container.clientWidth
    const H = container.clientHeight

    // ── RENDERER ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // ★ ACSE filmic tone mapping — same as doc2, massive image quality boost
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.9
    container.appendChild(renderer.domElement)

    // ── SCENE / CAMERA ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.01, 100)
    camera.position.set(0, 1.5, 17)
    camera.lookAt(0, 0.3, 0)

    // ── ENVIRONMENT MAP (studio-quality chrome reflections) ──────────────────
    // This is the KEY difference from doc3 — environment map gives chrome its
    // real-world mirror finish and also lifts photo brightness/contrast
    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    const envCvs = document.createElement('canvas')
    envCvs.width = 512; envCvs.height = 256
    const ec = envCvs.getContext('2d')
    const grad = ec.createLinearGradient(0, 0, 0, 256)
    grad.addColorStop(0, '#ffffff')
    grad.addColorStop(0.15, '#f0f4ff')
    grad.addColorStop(0.5, '#b8c0d4')
    grad.addColorStop(1, '#485068')
    ec.fillStyle = grad; ec.fillRect(0, 0, 512, 256)
    const hs1 = ec.createRadialGradient(90, 40, 0, 90, 40, 130)
    hs1.addColorStop(0, 'rgba(255,255,255,1)'); hs1.addColorStop(1, 'rgba(255,255,255,0)')
    ec.fillStyle = hs1; ec.fillRect(0, 0, 512, 256)
    const hs2 = ec.createRadialGradient(420, 210, 0, 420, 210, 90)
    hs2.addColorStop(0, 'rgba(210,225,255,0.8)'); hs2.addColorStop(1, 'rgba(210,225,255,0)')
    ec.fillStyle = hs2; ec.fillRect(0, 0, 512, 256)
    const envTex = new THREE.CanvasTexture(envCvs)
    envTex.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = pmrem.fromEquirectangular(envTex).texture

    // ── LIGHTS ────────────────────────────────────────────────────────────────
    const key = new THREE.DirectionalLight(0xfff8f0, 5.0)
    key.position.set(4, 10, 6); key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xd0e0ff, 2.5)
    fill.position.set(-6, 4, 3); scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffffff, 3.2)
    rim.position.set(0, 3, -8); scene.add(rim)
    const top = new THREE.DirectionalLight(0xffffff, 2.0)
    top.position.set(0, 12, 0); scene.add(top)
    scene.add(new THREE.AmbientLight(0xffffff, 0.9))

    // ── CHROME MATERIALS ──────────────────────────────────────────────────────
    const CM = () => new THREE.MeshStandardMaterial({ color: 0xdde0ec, metalness: 1, roughness: 0.04, envMapIntensity: 3.2 })
    const CM2 = () => new THREE.MeshStandardMaterial({ color: 0xf0f2ff, metalness: 1, roughness: 0.06, envMapIntensity: 2.8 })

    const root = new THREE.Group()
    scene.add(root)

    // ── BASE ──────────────────────────────────────────────────────────────────
    const baseOuter = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.1, 0.30, 64), CM())
    baseOuter.position.y = -4.2; baseOuter.castShadow = true; baseOuter.receiveShadow = true
    root.add(baseOuter)
    const baseInner = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.75, 0.16, 64), CM2())
    baseInner.position.y = -4.08; root.add(baseInner)
    const groove = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.07, 16, 64), CM2())
    groove.rotation.x = Math.PI / 2; groove.position.y = -4.02; root.add(groove)

    // ── RIDGED COLUMN ──────────────────────────────────────────────────────────
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.13, COL_H, 32), CM())
    shaft.position.y = -0.05; root.add(shaft)
    for (let i = 0; i < 22; i++) {
      const r = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.065, 32), CM2())
      r.position.y = -2.0 + i * 0.38; root.add(r)
    }
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.175, 0.115, 0.24, 32), CM())
    neck.position.y = ARM_Y - 0.12; root.add(neck)

    // ── TOP BALL ──────────────────────────────────────────────────────────────
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.30, 32, 32), CM2())
    ball.position.y = ARM_Y + 0.28; root.add(ball)

    // ── CAROUSEL ──────────────────────────────────────────────────────────────
    const carousel = new THREE.Group()
    root.add(carousel)

    // ★ MAX ANISOTROPY — sharpest possible textures at oblique angles
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy()

    /**
     * ★ HIGH QUALITY photo texture (matches doc2 exactly):
     *   - 2048×TEX_H canvas (4× the resolution of doc3)
     *   - maxAnisotropy filtering
     *   - LinearMipmapLinear min filter
     *   - ACESFilmic tonemapping (set on renderer above)
     *   - Async real-image load with cover-crop redraw
     *   - SRGBColorSpace for accurate colour reproduction
     */
    function makePhotoTexture(photoIdx) {
      const photo = photos[photoIdx]
      const cvs = document.createElement('canvas')
      cvs.width = TEX_W
      cvs.height = TEX_H
      const ctx = cvs.getContext('2d')

      // Colourful placeholder while real image loads
      const hue = 190 + (photoIdx * 37) % 140
      const bg = ctx.createLinearGradient(0, 0, 0, TEX_H)
      bg.addColorStop(0, `hsl(${hue},45%,10%)`)
      bg.addColorStop(0.5, `hsl(${hue + 25},38%,18%)`)
      bg.addColorStop(1, `hsl(${hue},45%,8%)`)
      ctx.fillStyle = bg; ctx.fillRect(0, 0, TEX_W, TEX_H)

      const rg = ctx.createRadialGradient(TEX_W / 2, TEX_H / 2, 0, TEX_W / 2, TEX_H / 2, TEX_W * 0.28)
      rg.addColorStop(0, `hsl(${hue},65%,50%)`)
      rg.addColorStop(0.5, `hsl(${hue + 30},55%,28%)`)
      rg.addColorStop(1, `hsla(${hue},40%,8%,0)`)
      ctx.fillStyle = rg; ctx.fillRect(0, 0, TEX_W, TEX_H)

      ctx.fillStyle = 'rgba(255,255,255,0.92)'
      ctx.font = `bold ${Math.round(TEX_W * 0.055)}px sans-serif`
      ctx.textAlign = 'center'
      ctx.shadowColor = `hsl(${hue},90%,65%)`
      ctx.shadowBlur = 50
      ctx.fillText(photo.alt, TEX_W / 2, TEX_H * 0.5)

      // ★ THREE.js texture with ALL quality settings maxed
      const t = new THREE.CanvasTexture(cvs)
      t.colorSpace = THREE.SRGBColorSpace           // ★ accurate colours
      t.anisotropy = maxAnisotropy                  // ★ sharp at angles
      t.generateMipmaps = true
      t.minFilter = THREE.LinearMipmapLinearFilter // ★ trilinear filtering
      t.magFilter = THREE.LinearFilter

      // ★ Async load the real photo → cover-crop redraw → texture update
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ctx.clearRect(0, 0, TEX_W, TEX_H)
        drawCoverCrop(ctx, img, TEX_W, TEX_H)        // ★ object-fit: cover
        t.needsUpdate = true                          // ★ push to GPU
      }
      img.src = photo.src
      return t
    }

    // Pre-load ALL textures upfront (no lazy loading)
    const allTextures = photos.map((_, idx) => makePhotoTexture(idx))

    // ★ MeshStandardMaterial for photo panes — responds to lighting properly
    //   roughness: 0 = mirror-like, 0.10 = slight diffuse = "photo paper" look
    const paneMats = Array.from({ length: FRAME_COUNT }, (_, s) =>
      new THREE.MeshStandardMaterial({
        map: allTextures[s % allTextures.length],
        metalness: 0,
        roughness: 0.10,          // ★ photo-paper finish (was MeshBasicMaterial in doc3)
        side: THREE.FrontSide,
        envMapIntensity: 0.3,     // ★ subtle environment reflection on photo surface
      })
    )
    const backPaneMats = Array.from({ length: FRAME_COUNT }, (_, s) =>
      new THREE.MeshStandardMaterial({
        map: allTextures[(s + FRAME_COUNT) % allTextures.length],
        metalness: 0,
        roughness: 0.10,
        side: THREE.FrontSide,
        envMapIntensity: 0.3,
      })
    )

    // ── L-arm bracket (same as doc2) ──────────────────────────────────────────
    function makeArmBracket(fx, fz, angle, colY, frameEdgeY) {
      for (const side of [-1, 1]) {
        const cornerLocalX = side * (FW / 2 - 0.15)
        const cWX = fx + cornerLocalX * Math.cos(angle)
        const cWZ = fz + cornerLocalX * (-Math.sin(angle))
        const sX = Math.sin(angle) * 0.15
        const sZ = Math.cos(angle) * 0.15

        const hLen = Math.sqrt((cWX - sX) ** 2 + (cWZ - sZ) ** 2)
        const hMX = (sX + cWX) / 2, hMZ = (sZ + cWZ) / 2
        const hArm = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, hLen, 16), CM())
        hArm.position.set(hMX, colY, hMZ)
        const hDir = new THREE.Vector3(cWX - sX, 0, cWZ - sZ).normalize()
        const hQ = new THREE.Quaternion()
        hQ.setFromUnitVectors(new THREE.Vector3(0, 1, 0), hDir)
        hArm.applyQuaternion(hQ); carousel.add(hArm)

        const bk = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), CM2())
        bk.position.set(cWX, colY, cWZ); carousel.add(bk)

        const vLen = Math.abs(colY - frameEdgeY) - 0.05
        const vMY = (colY + frameEdgeY) / 2
        const vArm = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, vLen, 16), CM())
        vArm.position.set(cWX, vMY, cWZ); carousel.add(vArm)

        const fk = new THREE.Mesh(new THREE.SphereGeometry(0.068, 12, 12), CM2())
        fk.position.set(cWX, frameEdgeY, cWZ); carousel.add(fk)

        const stub = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.22, 12), CM())
        stub.position.set(sX, colY, sZ)
        const stQ = new THREE.Quaternion()
        stQ.setFromUnitVectors(new THREE.Vector3(0, 1, 0), hDir)
        stub.applyQuaternion(stQ); carousel.add(stub)
      }
    }

    // ── Build 4 frames ────────────────────────────────────────────────────────
    for (let i = 0; i < FRAME_COUNT; i++) {
      const angle = (i / FRAME_COUNT) * Math.PI * 2
      const fx = Math.sin(angle) * RADIUS
      const fz = Math.cos(angle) * RADIUS
      const outDir = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle))

      const frameBox = new THREE.Mesh(new THREE.BoxGeometry(FW, FH, FD), CM())
      frameBox.position.set(fx, 0, fz); frameBox.rotation.y = angle
      frameBox.castShadow = true; carousel.add(frameBox)

      const innerW = FW - BW * 2
      const innerH = FH - BW * 2

      // Front photo pane
      const pPane = new THREE.Mesh(new THREE.PlaneGeometry(innerW, innerH), paneMats[i])
      pPane.position.set(fx + outDir.x * (FD / 2 + 0.006), 0, fz + outDir.z * (FD / 2 + 0.006))
      pPane.rotation.y = angle; carousel.add(pPane)

      // Back photo pane
      const bPane = new THREE.Mesh(new THREE.PlaneGeometry(innerW, innerH), backPaneMats[i])
      bPane.position.set(fx - outDir.x * (FD / 2 + 0.006), 0, fz - outDir.z * (FD / 2 + 0.006))
      bPane.rotation.y = angle + Math.PI; carousel.add(bPane)

      // Corner accent spheres
      for (const cx of [-1, 1]) {
        for (const cy of [-1, 1]) {
          const lx = cx * (FW / 2 - 0.09)
          const dot = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), CM2())
          dot.position.set(
            fx + lx * Math.cos(angle) + outDir.x * (FD / 2 + 0.012),
            cy * (FH / 2 - 0.09),
            fz + lx * (-Math.sin(angle)) + outDir.z * (FD / 2 + 0.012)
          )
          carousel.add(dot)
        }
      }

      makeArmBracket(fx, fz, angle, ARM_Y, FH / 2 + 0.04)
      makeArmBracket(fx, fz, angle, -ARM_Y, -(FH / 2 + 0.04))

      const clip = new THREE.Mesh(new THREE.BoxGeometry(FW * 0.65, 0.13, 0.19), CM())
      clip.position.set(fx, -(FH / 2 + 0.04), fz); clip.rotation.y = angle
      carousel.add(clip)
    }

    // ── Photo cycling ─────────────────────────────────────────────────────────
    let targetRot = 0, currentRot = 0
    const STEP = (Math.PI * 2) / FRAME_COUNT
    let photoOffset = 0

    const interval = setInterval(() => {
      targetRot -= STEP
      photoOffset = (photoOffset + 1) % allTextures.length
      for (let s = 0; s < FRAME_COUNT; s++) {
        paneMats[s].map = allTextures[(photoOffset + s) % allTextures.length]
        paneMats[s].needsUpdate = true
        backPaneMats[s].map = allTextures[(photoOffset + s + FRAME_COUNT) % allTextures.length]
        backPaneMats[s].needsUpdate = true
      }
    }, STEP_MS)

    // ── RENDER LOOP ───────────────────────────────────────────────────────────
    let rafId
    function animate() {
      rafId = requestAnimationFrame(animate)
      currentRot += (targetRot - currentRot) * 0.048
      carousel.rotation.y = currentRot
      const t = Date.now() * 0.0003
      camera.position.x = Math.sin(t * 0.22) * 0.5
      camera.position.y = 1.5 + Math.sin(t * 0.16) * 0.05
      camera.lookAt(0, 0.3, 0)
      renderer.render(scene, camera)
    }
    animate()

    // ── RESIZE ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight
      renderer.setSize(w, h); camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      allTextures.forEach(t => t.dispose())
      paneMats.forEach(m => m.dispose())
      backPaneMats.forEach(m => m.dispose())
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: 720,
        borderRadius: 20,
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse at 45% 25%, #070c1bff 0%, #060913ff 50%, #0b111fff 100%)',
        boxShadow:
          '0 40px 100px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.55)',
      }}
    />
  )
}

export default function Gallery({ onOrder }) {
  return (
    <section id="about" className="py-24 border-t border-border/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="section-label mb-4">A QUICK GLANCE</p>

            <h2 className="font-display text-5xl lg:text-6xl font-black leading-[1.05] mb-6">
              Turning{' '}
              <span className="italic gradient-text">ideas</span>
              {' '}into<br />
              real products
            </h2>

            <div className="space-y-4 text-muted leading-relaxed text-[15px]">
              <p>
                I&apos;m <span className="text-foreground font-semibold">Surinder Kumar</span>, a builder
                at heart and a developer by passion — focused on turning ideas into real, scalable
                digital products.
              </p>
              <p>
                I specialize in Python, web development, and automation — solutions that don&apos;t
                just look good, but actually solve real-world problems.
              </p>
              <p>
                Currently exploring AI, building products, and pushing toward my own tech-driven
                business ecosystem.
              </p>
              <p className="text-foreground font-medium">
                My goal is simple —{' '}
                <span className="italic gradient-text">build, scale, and create things that matter.</span>
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center gap-4"
            >



              <motion.a
                href="#work"
                whileHover={{ x: 4 }}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                See My Work →
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — 3D Chrome Stand */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="flex justify-center items-center py-6"
          >
            <div style={{ width: '100%', maxWidth: 560 }}>
              <ChromeFrameStand />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}