<script setup lang="ts">
import PageLayoutSpacer from '@/components/PageLayoutSpacer.vue';
import Button from '@/components/Button.vue';
import { icon as baroIcon } from './info';
import { drivers } from './drivers/driver-data';

const base = import.meta.env.BASE_URL;

function scrollToDrivers() {
    document.getElementById('drivers')?.scrollIntoView({ behavior: 'smooth' });
}

const stats = [
    { value: '2-3s', label: 'Boot Time', icon: 'pi-bolt' },
    { value: '10s', label: 'Sample Interval', icon: 'pi-sync' },
    { value: '200ms', label: 'Display Refresh', icon: 'pi-desktop' },
    { value: '~80KB', label: 'Heap Usage', icon: 'pi-microchip' },
];

const hardwareSpecs = [
    { name: 'ESP32-S3', detail: 'Dual-core Xtensa LX7', icon: 'pi-microchip' },
    { name: '320x240 LCD', detail: 'ILI9342C RGB565 SPI', icon: 'pi-desktop' },
    { name: 'SHT40', detail: 'Temperature & Humidity', icon: 'pi-chart-line' },
    { name: 'MicroSD', detail: 'Persistent Storage', icon: 'pi-database' },
    { name: 'FT6336U', detail: 'Capacitive Touch', icon: 'pi-tablet' },
    { name: 'AXP2101', detail: 'Power Management', icon: 'pi-bolt' },
    { name: 'AW9523', detail: 'GPIO Expander', icon: 'pi-sitemap' },
    { name: '8MB PSRAM', detail: 'Extended Memory', icon: 'pi-server' },
];

const architectureTasks = [
    { name: 'Sensor Sampling', desc: 'SHT40 reads every 10s via I\u00B2C', icon: 'pi-chart-line', position: 'left' },
    { name: 'Embassy Runtime', desc: 'Async task orchestration', icon: 'pi-cog', position: 'center' },
    { name: 'Touch Input', desc: 'FT6336U gesture detection', icon: 'pi-tablet', position: 'left' },
    { name: 'LCD Display', desc: '5Hz render at 200ms refresh', icon: 'pi-desktop', position: 'right' },
    { name: 'SD Storage', desc: 'Batched writes, append-only', icon: 'pi-database', position: 'right' },
];

const techStack = [
    { name: 'Rust', desc: 'Systems language' },
    { name: 'Embassy', desc: 'Async runtime' },
    { name: 'esp-hal', desc: 'Hardware abstraction' },
    { name: 'embedded-hal', desc: 'Portable traits' },
    { name: 'SHT40', desc: 'Sensor driver' },
    { name: 'FatFS', desc: 'SD filesystem' },
    { name: 'ILI9342C', desc: 'Display driver' },
    { name: 'SNTP', desc: 'Time sync' },
];

const futureRoadmap = [
    {
        phase: 'Near-term',
        items: ['BMP390 pressure sensor', 'BH1750 light sensor', 'Battery monitoring', 'Deep sleep mode'],
    },
    {
        phase: 'Medium-term',
        items: ['SCD41 CO\u2082 sensing', 'SGP40 VOC detection', 'Dew point & heat index', 'Advanced metrics'],
    },
    {
        phase: 'Long-term',
        items: ['Custom PCB with 20+ sensors', 'OTA firmware updates', 'Cloud integration', 'Remote monitoring dashboard'],
    },
];

const driverList = Object.values(drivers);
</script>

<template>
    <PageLayoutSpacer>

        <!-- ============================================================
             HERO
        ============================================================ -->
        <div class="relative w-full overflow-hidden rounded-2xl border border-white/8 shadow-xl">
            <!-- Layered backgrounds -->
            <div class="absolute inset-0 bg-[#0c0a09]" />
            <div class="absolute inset-0 bg-linear-to-br from-baro-default/8 via-transparent to-baro-copper/5" />

            <!-- PCB circuit trace grid -->
            <div class="absolute inset-0 opacity-30"
                style="background-image: linear-gradient(90deg, rgba(245,158,11,0.08) 1px, transparent 1px), linear-gradient(rgba(245,158,11,0.08) 1px, transparent 1px); background-size: 24px 24px;" />

            <!-- Diagonal circuit traces -->
            <div class="absolute inset-0 opacity-15"
                style="background-image: linear-gradient(45deg, rgba(184,115,51,0.12) 1px, transparent 1px); background-size: 34px 34px;" />

            <!-- Glow orbs -->
            <div class="pointer-events-none absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-baro-default/20 blur-3xl animate-pulse"
                style="animation-duration: 4s;" />
            <div class="pointer-events-none absolute -bottom-16 right-16 h-64 w-64 rounded-full bg-baro-copper/15 blur-3xl animate-pulse"
                style="animation-duration: 6s;" />
            <div class="pointer-events-none absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-baro-rust/10 blur-3xl animate-pulse"
                style="animation-duration: 5s;" />

            <!-- Top accent line -->
            <div
                class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-baro-default/80 to-transparent" />

            <!-- Animated data stream dots -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="data-stream-dot absolute h-1 w-1 rounded-full bg-baro-default/40"
                    style="top: 20%; animation: dataStream 8s linear infinite;" />
                <div class="data-stream-dot absolute h-1 w-1 rounded-full bg-baro-copper/30"
                    style="top: 60%; animation: dataStream 12s linear infinite 3s;" />
                <div class="data-stream-dot absolute h-0.5 w-0.5 rounded-full bg-baro-default/25"
                    style="top: 80%; animation: dataStream 10s linear infinite 6s;" />
            </div>

            <div class="relative z-10 px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16">

                <!-- Platform badge -->
                <div
                    class="mb-7 inline-flex items-center gap-2 rounded-full border border-baro-default/30 bg-baro-default/10 px-3.5 py-1.5 backdrop-blur-sm">
                    <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-baro-default" />
                    <span class="text-xs font-semibold uppercase tracking-widest text-baro-default">
                        ESP32-S3 · Rust · no_std
                    </span>
                </div>

                <!-- Logo + Title -->
                <div class="mb-5 flex items-center gap-4">
                    <img :src="baroIcon" alt="Baro-RS icon"
                        class="h-14 w-14 shrink-0 rounded-2xl shadow-lg shadow-black/50 sm:h-16 sm:w-16" />
                    <h1 class="text-5xl font-bold leading-none tracking-tight text-white sm:text-6xl md:text-7xl">
                        Baro<span class="text-baro-default">.</span>RS
                    </h1>
                </div>

                <!-- Tagline -->
                <p class="mb-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                    A production-grade environmental monitoring station written entirely in Rust for the ESP32-S3.
                    Designed to run continuously for months or years with exceptional reliability —
                    sampling, storing, and visualizing environmental data in real time.
                </p>

                <!-- Status chips -->
                <div class="mb-8 flex flex-wrap gap-2">
                    <span
                        v-for="chip in ['Embassy Async', 'SHT40 Sensor', 'SD Storage', 'Touch LCD', 'Multi-Scale Rollups']"
                        :key="chip"
                        class="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/50 backdrop-blur-sm">
                        <span class="h-1 w-1 rounded-full bg-baro-default/50" />
                        {{ chip }}
                    </span>
                </div>

                <!-- CTAs -->
                <div class="flex flex-row flex-wrap gap-3">
                    <Button link="https://github.com/trevorflahardy/baro-rs" content="Source Code" icon="pi-github"
                        background="bg-baro-default/20 hover:bg-baro-default/30 border border-baro-default/40" />
                    <button type="button" @click="scrollToDrivers"
                        class="group py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl shadow font-medium transition-all duration-500 hover:scale-105 ease-in-out bg-white/6 hover:bg-white/10 border border-white/10 cursor-pointer driver-pulse">
                        <span class="text-white text-sm font-medium flex flex-row items-center justify-center gap-2">
                            <i class="pi pi-microchip"></i>
                            <span>View Drivers</span>
                            <i
                                class="pi pi-arrow-down text-xs transition-transform duration-300 group-hover:translate-y-0.5" />
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <!-- ============================================================
             STATS
        ============================================================ -->
        <div class="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            <div v-for="stat in stats" :key="stat.label"
                class="glass-card flex flex-col items-center gap-1.5 px-4 py-5 text-center">
                <div
                    class="mb-1 flex h-8 w-8 items-center justify-center rounded-xl border border-baro-default/20 bg-baro-default/10">
                    <i class="pi text-baro-default text-sm" :class="stat.icon" />
                </div>
                <span class="text-2xl font-bold leading-none tracking-tight text-baro-default sm:text-3xl font-mono">
                    {{ stat.value }}
                </span>
                <span class="text-xs leading-tight text-white/55">{{ stat.label }}</span>
            </div>
        </div>

        <!-- ============================================================
             THE PROBLEM — WHY THIS EXISTS
        ============================================================ -->
        <div class="glass-card w-full p-6 sm:p-8">
            <div class="flex items-center gap-2.5 mb-5">
                <div class="h-0.5 w-6 rounded-full bg-baro-default" />
                <span class="text-xs font-semibold uppercase tracking-widest text-baro-default">The Problem</span>
            </div>
            <h2 class="title-2 mb-0">What if you could see the air?</h2>
            <p class="body mt-3">
                Temperature, humidity, CO&#x2082; levels, air pressure, light intensity — the environment around
                us is constantly changing, but these changes are invisible. Consumer weather stations give you a
                snapshot. Baro-RS gives you the full picture: continuous, high-resolution environmental data
                recorded over weeks, months, or years.
            </p>
            <p class="body mb-0">
                This isn't a weekend project with an Arduino and a DHT11. It's a production-grade monitoring
                station built to run unattended, survive power cycles, and produce data you can actually trust —
                because the firmware, the drivers, and the storage layer are all written from scratch in Rust.
            </p>
        </div>

        <!-- ============================================================
             HARDWARE SECTION — STICKY IMAGES
        ============================================================ -->
        <div class="w-full">
            <div class="flex items-center gap-2.5 mb-6">
                <div class="h-0.5 w-6 rounded-full bg-baro-default" />
                <span class="text-xs font-semibold uppercase tracking-widest text-baro-default">Hardware</span>
            </div>

            <div class="flex flex-col gap-8 lg:flex-row lg:gap-10">
                <!-- Photos — sticky on desktop so they stay visible as you scroll past specs -->
                <div
                    class="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[40%] lg:shrink-0 lg:sticky lg:top-4 lg:self-start">
                    <div class="flex-1 overflow-hidden rounded-xl border border-baro-default/15 p-1.5">
                        <img :src="`${base}baro-rs/hardware-1.png`" alt="Baro-RS hardware front view"
                            class="w-full rounded-lg" />
                        <p class="mt-1.5 text-center text-xs italic text-white/35">Breadboard prototype — detailed view
                        </p>
                    </div>
                    <div class="flex-1 overflow-hidden rounded-xl border border-baro-default/15 p-1.5">
                        <img :src="`${base}baro-rs/hardware-2.png`" alt="Baro-RS hardware alternate view"
                            class="w-full rounded-lg" />
                        <p class="mt-1.5 text-center text-xs italic text-white/35">M5Stack CoreS3 SE — single-room
                            monitor</p>
                    </div>
                </div>

                <!-- Description + specs — scrolls past the sticky images -->
                <div class="min-w-0 flex-1">
                    <h2 class="title-2 mb-0">Built on real hardware.</h2>
                    <p class="body mt-3">
                        Baro-RS runs on the M5Stack CoreS3 SE — an ESP32-S3 development board with a built-in
                        capacitive touch LCD, power management IC, GPIO expander, and microSD slot. It's a
                        complete embedded computer the size of a matchbox.
                    </p>
                    <p class="body">
                        The current prototype lives on a breadboard, but the architecture is designed for a
                        single custom PCB that will house 20+ sensors — from CO&#x2082; and VOC detection to
                        UV index and particulate matter.
                    </p>
                    <p class="body mb-5">
                        Every peripheral on this board is driven by a purpose-built Rust driver written from
                        scratch. No C bindings, no unsafe wrappers — just pure embedded Rust with
                        platform-agnostic traits that can run on any microcontroller.
                    </p>

                    <!-- Hardware spec grid -->
                    <div class="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <div v-for="spec in hardwareSpecs" :key="spec.name"
                            class="flex items-center gap-2.5 rounded-xl border border-white/6 bg-white/3 px-3 py-2.5">
                            <div
                                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-baro-default/15 bg-baro-default/8">
                                <i class="pi text-baro-default text-xs" :class="spec.icon" />
                            </div>
                            <div class="min-w-0">
                                <p class="text-xs font-semibold text-white/90 leading-tight">{{ spec.name }}</p>
                                <p class="text-[10px] text-white/45 leading-tight">{{ spec.detail }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             HOW IT WORKS — THE STORY
        ============================================================ -->
        <div class="glass-card w-full p-6 sm:p-8">
            <div class="flex items-center gap-2.5 mb-5">
                <div class="h-0.5 w-6 rounded-full bg-baro-default" />
                <span class="text-xs font-semibold uppercase tracking-widest text-baro-default">How It Works</span>
            </div>
            <h2 class="title-2 mb-0">Always watching. Never sleeping.</h2>
            <p class="body mt-3 mb-0">
                Every 10 seconds, Baro-RS wakes the SHT40 sensor, reads the temperature and humidity over I&#x00B2;C,
                and stores the result. Readings accumulate on the microSD card in an append-only format optimized
                for longevity — no filesystem fragmentation, no database overhead, just fixed-size versioned records
                written in batches.
            </p>
            <p class="body mt-3 mb-0">
                Meanwhile, the touch LCD renders real-time graphs and historical trends at 5 frames per second.
                Swipe through time scales — from the last 5 minutes to the entire recording history — and watch
                patterns emerge. Daily temperature cycles, humidity spikes when it rains, the slow seasonal drift
                across months. All of this runs concurrently on an async runtime with no operating system.
            </p>
        </div>

        <!-- ============================================================
             ARCHITECTURE
        ============================================================ -->
        <div class="w-full">
            <div class="mb-6 text-center">
                <div class="mb-3 flex items-center justify-center gap-3">
                    <div class="h-px w-10 rounded-full bg-baro-default/40" />
                    <span class="text-xs font-semibold uppercase tracking-widest text-baro-default">Architecture</span>
                    <div class="h-px w-10 rounded-full bg-baro-default/40" />
                </div>
                <h2 class="title-2 mb-2">Async from the ground up.</h2>
                <p class="subtitle">Embassy orchestrates concurrent tasks — sampling, rendering, storage, and touch —
                    all without an OS.</p>
            </div>

            <!-- Architecture flow diagram -->
            <div class="glass-card w-full p-5 sm:p-7">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
                    <!-- Input column -->
                    <div class="flex flex-col gap-3 lg:w-[28%]">
                        <div v-for="task in architectureTasks.filter(t => t.position === 'left')" :key="task.name"
                            class="flex items-center gap-3 rounded-xl border border-baro-default/15 bg-baro-default/5 px-4 py-3">
                            <div
                                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-baro-default/20 bg-baro-default/10">
                                <i class="pi text-baro-default text-sm" :class="task.icon" />
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-white/90">{{ task.name }}</p>
                                <p class="text-xs text-white/50">{{ task.desc }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Center connector + Embassy core -->
                    <div class="flex flex-col items-center justify-center lg:w-[44%] py-4 lg:py-0">
                        <!-- Desktop: with connecting lines -->
                        <div class="hidden lg:flex items-center w-full justify-center gap-0">
                            <div class="h-px flex-1 bg-linear-to-r from-baro-default/10 to-baro-default/30" />
                            <div
                                class="relative rounded-2xl border-2 border-baro-default/30 bg-baro-default/8 px-6 py-5 backdrop-blur-sm">
                                <div class="absolute -inset-1 rounded-2xl bg-baro-default/5 blur-xl" />
                                <div class="relative text-center">
                                    <div class="mb-2 flex justify-center">
                                        <div
                                            class="flex h-12 w-12 items-center justify-center rounded-2xl border border-baro-default/30 bg-baro-default/15">
                                            <i class="pi pi-cog text-baro-default text-xl" />
                                        </div>
                                    </div>
                                    <p class="text-sm font-bold text-baro-default">Embassy Runtime</p>
                                    <p class="text-xs text-white/50 mt-0.5">Async task orchestration</p>
                                </div>
                            </div>
                            <div class="h-px flex-1 bg-linear-to-r from-baro-default/30 to-baro-default/10" />
                        </div>

                        <!-- Mobile: simple centered card -->
                        <div
                            class="lg:hidden rounded-2xl border-2 border-baro-default/30 bg-baro-default/8 px-6 py-5 backdrop-blur-sm w-full">
                            <div class="flex items-center gap-3 justify-center">
                                <div
                                    class="flex h-10 w-10 items-center justify-center rounded-xl border border-baro-default/30 bg-baro-default/15">
                                    <i class="pi pi-cog text-baro-default text-lg" />
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-baro-default">Embassy Runtime</p>
                                    <p class="text-xs text-white/50">Async task orchestration</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Output column -->
                    <div class="flex flex-col gap-3 lg:w-[28%]">
                        <div v-for="task in architectureTasks.filter(t => t.position === 'right')" :key="task.name"
                            class="flex items-center gap-3 rounded-xl border border-baro-copper/15 bg-baro-copper/5 px-4 py-3">
                            <div
                                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-baro-copper/20 bg-baro-copper/10">
                                <i class="pi text-baro-copper text-sm" :class="task.icon" />
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-white/90">{{ task.name }}</p>
                                <p class="text-xs text-white/50">{{ task.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             SMART STORAGE — replaces the old "Data Rollups" section
        ============================================================ -->
        <div class="glass-card w-full p-6 sm:p-8">
            <div class="flex items-center gap-2.5 mb-5">
                <div class="h-0.5 w-6 rounded-full bg-baro-default" />
                <span class="text-xs font-semibold uppercase tracking-widest text-baro-default">Smart Storage</span>
            </div>
            <h2 class="title-2 mb-0">196 years of data on a single microSD card.</h2>
            <p class="body mt-3">
                At one sample every 10 seconds, Baro-RS generates over 8,000 readings per day. Raw storage would
                fill a microSD card in weeks — so the system intelligently compresses history using multi-scale
                rollups. Recent data keeps full resolution. Older data gets aggregated into summaries at
                progressively larger time windows, preserving trends while staying within storage limits.
            </p>
            <p class="body mb-6">
                The result: you can zoom from a 5-minute real-time view all the way out to the complete recording
                history, and every scale tells a meaningful story.
            </p>

            <!-- Time scale visualization -->
            <div class="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                <div v-for="(scale, i) in [
                    { label: '5 min', desc: 'Real-time' },
                    { label: '1 hour', desc: 'Short-term' },
                    { label: '24 hours', desc: 'Daily cycle' },
                    { label: '7 days', desc: 'Weekly' },
                    { label: '1 month', desc: 'Seasonal' },
                    { label: 'All time', desc: 'Full history' },
                ]" :key="scale.label"
                    class="group flex flex-col items-center rounded-xl border border-white/6 bg-white/3 px-2 py-3 text-center transition-all duration-300 hover:border-baro-default/20 hover:bg-baro-default/5">
                    <div
                        class="mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-baro-default/20 bg-baro-default/8 font-mono text-[10px] font-bold text-baro-default transition-transform duration-300 group-hover:scale-110">
                        {{ String(i + 1).padStart(2, '0') }}
                    </div>
                    <p class="text-xs font-semibold text-white/85 mb-0.5">{{ scale.label }}</p>
                    <p class="text-[10px] text-white/40">{{ scale.desc }}</p>
                </div>
            </div>
        </div>

        <!-- ============================================================
             DRIVER GRID — GATEWAY TO SUB-PAGES
        ============================================================ -->
        <div id="drivers" class="w-full scroll-mt-8">
            <div class="mb-6 text-center">
                <div class="mb-3 flex items-center justify-center gap-3">
                    <div class="h-px w-10 rounded-full bg-baro-default/40" />
                    <span class="text-xs font-semibold uppercase tracking-widest text-baro-default">Rust Drivers</span>
                    <div class="h-px w-10 rounded-full bg-baro-default/40" />
                </div>
                <h2 class="title-2 mb-2">Every driver, written from scratch.</h2>
                <p class="subtitle">
                    Most embedded projects lean on C libraries or community crates. Baro-RS doesn't — every sensor,
                    every power rail, every I&#x00B2;C peripheral is driven by a custom <code
                        class="text-baro-default/80 text-xs bg-baro-default/8 px-1.5 py-0.5 rounded">no_std</code> Rust
                    driver,
                    designed to be portable across any embedded platform. Click any driver to explore it.
                </p>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <router-link v-for="driver in driverList" :key="driver.id"
                    :to="{ name: 'baro-rs-driver', params: { driverId: driver.id } }"
                    class="group relative glass-card overflow-hidden p-5 sm:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer no-underline">

                    <!-- Hover glow -->
                    <div class="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        :style="{ backgroundColor: driver.color + '15' }" />

                    <!-- Top border accent on hover -->
                    <div class="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        :style="{ background: `linear-gradient(90deg, transparent, ${driver.color}80, transparent)` }" />

                    <!-- Icon + Name -->
                    <div class="mb-3 flex items-center gap-3">
                        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300"
                            :style="{ borderColor: driver.color + '30', backgroundColor: driver.color + '12' }">
                            <i class="pi text-base" :class="driver.icon" :style="{ color: driver.color }" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <p class="text-sm font-bold text-white/90 group-hover:text-white transition-colors">{{
                                driver.name }}</p>
                            <p class="text-[10px] font-mono uppercase tracking-wider"
                                :style="{ color: driver.color + 'aa' }">
                                {{ driver.protocol }}
                            </p>
                        </div>
                        <!-- Arrow indicator — always visible -->
                        <div
                            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/4 transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/8">
                            <i
                                class="pi pi-arrow-right text-[10px] text-white/30 transition-all duration-300 group-hover:text-white/70 group-hover:translate-x-0.5" />
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="text-xs text-white/55 leading-relaxed mb-4">{{ driver.tagline }}</p>

                    <!-- Bottom: key metric + explore hint -->
                    <div class="flex items-center justify-between">
                        <span class="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-mono"
                            :style="{ borderColor: driver.color + '25', backgroundColor: driver.color + '08', color: driver.color + 'cc' }">
                            {{ driver.keyMetric }}
                        </span>
                        <span class="text-[10px] text-white/25 font-medium uppercase tracking-wider">Explore
                            driver</span>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- ============================================================
             FUTURE VISION
        ============================================================ -->
        <div class="glass-card w-full p-6 sm:p-8">
            <div class="flex items-center gap-2.5 mb-5">
                <div class="h-0.5 w-6 rounded-full bg-baro-default" />
                <span class="text-xs font-semibold uppercase tracking-widest text-baro-default">What's Next</span>
            </div>
            <h2 class="title-2 mb-1">From breadboard to custom PCB.</h2>
            <p class="body mb-6">
                The current prototype proves the architecture works. The next step is a single custom PCB that
                replaces the breadboard tangle with a clean, compact board housing 20+ environmental sensors —
                CO&#x2082;, VOC, particulate matter, UV, barometric pressure, and more. One device, one firmware,
                total environmental awareness.
            </p>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div v-for="(phase, i) in futureRoadmap" :key="phase.phase"
                    class="rounded-xl border border-white/6 bg-white/3 p-4">
                    <div class="mb-3 flex items-center gap-2">
                        <div
                            class="flex h-7 w-7 items-center justify-center rounded-full border border-baro-default/25 bg-baro-default/10 font-mono text-[10px] font-bold text-baro-default">
                            {{ String(i + 1).padStart(2, '0') }}
                        </div>
                        <span class="text-sm font-semibold text-white/90">{{ phase.phase }}</span>
                    </div>
                    <ul class="flex flex-col gap-1.5">
                        <li v-for="item in phase.items" :key="item"
                            class="flex items-start gap-2 text-xs text-white/55">
                            <i class="pi pi-chevron-right mt-0.5 shrink-0 text-[9px] text-baro-default/50" />
                            <span>{{ item }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- ============================================================
             TECH STACK
        ============================================================ -->
        <div class="w-full">
            <div class="mb-5 flex items-center justify-center gap-3">
                <div class="h-px w-8 rounded-full bg-baro-default/30" />
                <span class="text-xs font-semibold uppercase tracking-widest text-baro-default/65">Built With</span>
                <div class="h-px w-8 rounded-full bg-baro-default/30" />
            </div>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div v-for="tech in techStack" :key="tech.name" class="glass-card flex items-center gap-3 p-3.5">
                    <div
                        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-baro-default/20 bg-baro-default/10">
                        <span class="font-mono text-xs font-bold text-baro-default">{{ tech.name.substring(0,
                            2).toUpperCase() }}</span>
                    </div>
                    <div>
                        <p class="text-sm font-semibold leading-tight text-white/90">{{ tech.name }}</p>
                        <p class="mt-0.5 text-xs text-white/45">{{ tech.desc }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             FOOTER NOTE
        ============================================================ -->
        <div class="pb-4">
            <p class="mx-auto max-w-xl text-center text-xs italic leading-relaxed text-white/35">
                Baro-RS is an ongoing project under active development. Hardware photos show the current breadboard
                prototype. All Rust drivers are open-source under the MIT license.
            </p>
        </div>

    </PageLayoutSpacer>
</template>

<style scoped>
@keyframes dataStream {
    0% {
        left: -2%;
        opacity: 0;
    }

    5% {
        opacity: 1;
    }

    95% {
        opacity: 1;
    }

    100% {
        left: 102%;
        opacity: 0;
    }
}

@keyframes driverPulse {

    0%,
    100% {
        box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
    }

    50% {
        box-shadow: 0 0 0 6px rgba(245, 158, 11, 0.15);
    }
}

.driver-pulse {
    animation: driverPulse 2.5s ease-in-out infinite;
}
</style>
