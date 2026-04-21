<script setup lang="ts">
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";

const features = [
    { icon: 'pi-shopping-bag', title: 'Patent-pending pocket', body: 'A discreet zipper pocket sewn into the seam. Holds a folded bill, a key, a lip balm. Nothing rattles, nothing spills.' },
    { icon: 'pi-star', title: 'USAPA-legal', body: 'Competition-approved. The pocket does not affect flight path, bounce, or durability — play-tested indoor and outdoor.' },
    { icon: 'pi-heart', title: 'Made for the fastest-growing sport', body: 'Built for the players already filling courts. Unique, memorable, genuinely useful. A real product with real demand.' },
];
</script>

<template>
    <div class="page-pp">
    <PageLayoutSpacer>

        <!-- ============================================================
             SHOWROOM HERO — fills viewport, product-first
        ============================================================ -->
        <div class="relative w-full overflow-hidden rounded-3xl shadow-2xl pp-hero">
            <!-- Court lines background -->
            <div class="absolute inset-0 pp-court-bg" />
            <!-- Glow behind ball -->
            <div class="absolute top-1/2 right-[28%] -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                style="background: radial-gradient(circle, rgba(223,255,0,0.28) 0%, rgba(223,255,0,0.06) 40%, transparent 70%); filter: blur(8px);" />

            <!-- Top brand bar -->
            <div class="relative z-10 flex items-center justify-between px-8 sm:px-12 py-5 border-b border-pp-neon/15">
                <span class="font-black text-base tracking-[0.35em] uppercase" style="color: #dfff00;">Pickle<span class="text-white/90"> Pockets</span></span>
                <div class="hidden sm:flex items-center gap-5 text-[11px] font-mono tracking-[0.2em] uppercase text-white/50">
                    <span>Patent pending</span>
                    <span class="w-1 h-1 rounded-full bg-pp-neon" />
                    <span>DTC · 2024</span>
                </div>
            </div>

            <div class="relative z-10 flex flex-col lg:flex-row min-h-[540px]">
                <!-- Copy side -->
                <div class="lg:w-[55%] px-8 sm:px-12 lg:px-16 py-12 lg:py-20 flex flex-col justify-center">
                    <p class="text-[11px] font-mono tracking-[0.3em] uppercase mb-6" style="color: #dfff00;">Volume 01 · Summer 2024</p>
                    <h1 class="pp-display text-5xl sm:text-6xl lg:text-[88px] font-black text-white leading-[0.92] tracking-tight mb-6 uppercase">
                        Finally,<br/>Pickleballs<br/><span style="color: #dfff00;">have pockets.</span>
                    </h1>
                    <p class="text-base sm:text-lg text-white/70 leading-relaxed mb-8 max-w-md">
                        A pickleball with a built-in pocket. Bring your key. Bring a tip. Stop asking your partner to hold your stuff.
                    </p>
                    <div class="flex flex-wrap gap-3 items-center">
                        <a href="https://picklepockets.shop" target="_blank" rel="noopener"
                            class="pp-cta inline-flex items-center gap-2 px-6 py-3 rounded-full font-black tracking-wide uppercase text-sm transition">
                            Shop Now <i class="pi pi-arrow-right text-xs" />
                        </a>
                        <span class="font-mono text-xs text-white/45 tracking-widest">picklepockets.shop</span>
                    </div>
                </div>

                <!-- Product shot side -->
                <div class="lg:w-[45%] relative flex items-center justify-center py-10 lg:py-0 px-6 lg:pr-14">
                    <img src="https://picklepockets.shop/cdn/shop/files/0001-6.png"
                        alt="Pickle Pockets — pickleball with pocket"
                        class="relative w-full max-w-[440px] drop-shadow-[0_30px_60px_rgba(223,255,0,0.22)]" />
                </div>
            </div>

            <!-- Marquee strip -->
            <div class="relative z-10 border-t border-pp-neon/20 overflow-hidden">
                <div class="flex items-center gap-10 py-3 px-8 whitespace-nowrap font-black text-xs tracking-[0.4em] uppercase animate-none" style="color: #dfff00;">
                    <span>★ USAPA Legal</span>
                    <span class="text-white/30">/</span>
                    <span>★ Patent Pending</span>
                    <span class="text-white/30">/</span>
                    <span>★ Founder-built</span>
                    <span class="text-white/30">/</span>
                    <span>★ Made for the court</span>
                    <span class="text-white/30">/</span>
                    <span>★ Shop now at picklepockets.shop</span>
                </div>
            </div>
        </div>

        <!-- ============================================================
             THE PITCH — magazine-style
        ============================================================ -->
        <div class="w-full grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-12 py-4">
            <p class="pp-display text-6xl lg:text-8xl font-black leading-none uppercase" style="color: #dfff00;">
                01
            </p>
            <div>
                <p class="text-[11px] font-mono tracking-[0.3em] uppercase text-pp-neon mb-3">The Problem</p>
                <h2 class="pp-display title-2 mb-4 uppercase">From a real problem on the court.</h2>
                <p class="body mb-3">
                    Pickleball is the fastest-growing sport in the country, and every player has the same problem: nowhere to put anything. No pockets in athletic shorts, no bag on the court, no good place to stash a car key or a dollar for the vending machine.
                </p>
                <p class="body mb-0 text-white/55">
                    Pickle Pockets solves it by putting the pocket in the ball itself — a USAPA-legal design that changes nothing about gameplay and everything about convenience. I founded the brand, designed the product, built the Shopify storefront.
                </p>
            </div>
        </div>

        <!-- ============================================================
             FEATURES — billboard cards
        ============================================================ -->
        <div class="w-full">
            <p class="text-[11px] font-mono tracking-[0.3em] uppercase text-pp-neon mb-3">Specs</p>
            <h2 class="pp-display title-2 uppercase mb-6">What makes it different.</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <div v-for="(f, i) in features" :key="f.title"
                    :class="[
                        'relative rounded-3xl border overflow-hidden p-6 flex flex-col gap-3 pp-feature-card transition-transform duration-300 ease-out hover:-translate-y-1',
                        i === 0 && 'sm:translate-y-0 sm:-rotate-[0.5deg]',
                        i === 1 && 'sm:-translate-y-5 sm:rotate-[0.25deg]',
                        i === 2 && 'sm:translate-y-3 sm:-rotate-[0.25deg]',
                    ]">
                    <span class="absolute top-4 right-5 font-mono text-[10px] tracking-[0.25em] uppercase" style="color: rgba(223,255,0,0.6);">0{{ i + 1 }}</span>
                    <div class="w-11 h-11 rounded-full flex items-center justify-center flex-none" style="background: rgba(223,255,0,0.15); border: 1px solid rgba(223,255,0,0.3);">
                        <i :class="['pi', f.icon, 'text-base']" style="color: #dfff00;" />
                    </div>
                    <h3 class="pp-display card-title mb-0 uppercase">{{ f.title }}</h3>
                    <p class="card-body mb-0">{{ f.body }}</p>
                </div>
            </div>
        </div>

        <!-- ============================================================
             WHAT I BUILT
        ============================================================ -->
        <div class="w-full rounded-3xl border p-8 sm:p-10 relative overflow-hidden" style="border-color: rgba(223,255,0,0.15); background-color: #0c1a11;">
            <p class="text-[11px] font-mono tracking-[0.3em] uppercase text-pp-neon mb-3">The Work</p>
            <h2 class="pp-display title-2 uppercase mb-6">What I built, end-to-end.</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="item in [
                    { label: 'Brand identity', sub: 'Logo, color system, naming, voice' },
                    { label: 'Shopify storefront', sub: 'Custom theme, product photography' },
                    { label: 'Patent filing', sub: 'Provisional application, product specs' },
                ]" :key="item.label"
                    class="rounded-2xl border p-5 flex flex-col gap-1" style="border-color: rgba(223,255,0,0.2); background-color: rgba(223,255,0,0.04);">
                    <span class="pp-display text-sm font-black uppercase tracking-wide" style="color: #dfff00;">{{ item.label }}</span>
                    <span class="text-xs text-white/55">{{ item.sub }}</span>
                </div>
            </div>
        </div>

        <!-- ============================================================
             BIG CTA
        ============================================================ -->
        <div class="w-full rounded-3xl pp-cta-block p-10 sm:p-14 text-center relative overflow-hidden">
            <p class="text-[11px] font-mono tracking-[0.3em] uppercase mb-4 text-black/60">It's actually for sale.</p>
            <h2 class="pp-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.95] mb-6 text-black">
                Go pick<br/>up a ball.
            </h2>
            <a href="https://picklepockets.shop" target="_blank" rel="noopener"
                class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-pp-neon font-black tracking-wider uppercase text-sm hover:bg-black/85 transition">
                picklepockets.shop <i class="pi pi-arrow-right text-xs" />
            </a>
        </div>

    </PageLayoutSpacer>
    </div>
</template>

<style scoped>
.pp-hero {
    background-color: #0a1609;
    border: 1px solid rgba(223, 255, 0, 0.15);
}

.pp-court-bg {
    background-color: #0c1a11;
    background-image:
        linear-gradient(rgba(223, 255, 0, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(223, 255, 0, 0.03) 1px, transparent 1px);
    background-size: 48px 48px;
}

.pp-display {
    font-family: "Helvetica Neue", "Inter", sans-serif;
    font-stretch: 120%;
    letter-spacing: -0.02em;
}

.pp-cta {
    background-color: #dfff00;
    color: #0a1609;
    box-shadow: 0 8px 24px -6px rgba(223, 255, 0, 0.5);
}

.pp-cta:hover {
    background-color: #eaff4d;
    transform: translateY(-1px);
}

.pp-feature-card {
    background-color: #0c1a11;
    border-color: rgba(223, 255, 0, 0.15);
    transition: border-color 0.3s;
}

.pp-feature-card:hover {
    border-color: rgba(223, 255, 0, 0.35);
}

.pp-cta-block {
    background: linear-gradient(135deg, #dfff00 0%, #c5e400 100%);
}
</style>
