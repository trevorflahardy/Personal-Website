<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import PageLayoutSpacer from '@/components/PageLayoutSpacer.vue';
import Button from '@/components/Button.vue';
import { drivers } from './driver-data';

const props = defineProps<{ driverId: string }>();
const router = useRouter();

const driver = computed(() => drivers[props.driverId]);
const otherDrivers = computed(() =>
    Object.values(drivers).filter(d => d.id !== props.driverId)
);

// Redirect if invalid driver (reactive — handles prop changes too)
watchEffect(() => {
    if (!driver.value) {
        router.replace({ name: 'project-baro-rs' });
    }
});

// CSS custom property style for theming
const themeStyle = computed(() => ({
    '--dc': driver.value?.color ?? '#f59e0b',
}));

// Simple Rust syntax highlighting (semantic spans)
function highlightRust(code: string): string {
    return code
        // Comments
        .replace(/(\/\/.*$)/gm, '<span class="text-white/30 italic">$1</span>')
        // Strings
        .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="text-green-400/80">$1</span>')
        // Keywords
        .replace(/\b(use|let|mut|if|fn|pub|struct|impl|return|async|await|move|self|true|false)\b/g, '<span class="text-purple-400">$1</span>')
        // Types / modules (capitalized words)
        .replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, '<span class="text-amber-300">$1</span>')
        // Macros
        .replace(/\b(println|format|vec)!/g, '<span class="text-cyan-300">$1</span>!')
        // Numbers
        .replace(/\b(\d+)\b/g, '<span class="text-orange-300">$1</span>')
        // Punctuation that's meaningful
        .replace(/(::|\?|&amp;|&)/g, '<span class="text-white/50">$1</span>');
}
</script>

<template>
    <PageLayoutSpacer v-if="driver">

        <!-- ============================================================
             BREADCRUMB NAVIGATION
        ============================================================ -->
        <div class="w-full">
            <router-link :to="{ name: 'project-baro-rs' }"
                class="group inline-flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-2 text-xs text-white/50 no-underline transition-all duration-300 hover:bg-white/8 hover:text-white/70 hover:border-white/15">
                <i class="pi pi-arrow-left text-[10px] transition-transform duration-300 group-hover:-translate-x-0.5" />
                <span>Baro-RS</span>
                <span class="text-white/25">/</span>
                <span :style="{ color: driver.color }">{{ driver.name }}</span>
            </router-link>
        </div>

        <!-- ============================================================
             HERO
        ============================================================ -->
        <div class="relative w-full overflow-hidden rounded-2xl border border-white/8 shadow-xl" :style="themeStyle">
            <!-- Background -->
            <div class="absolute inset-0 bg-[#0c0a09]" />
            <div class="absolute inset-0"
                :style="{ background: `linear-gradient(135deg, ${driver.color}08, transparent 60%, ${driver.color}04)` }" />

            <!-- Grid pattern -->
            <div class="absolute inset-0 opacity-20"
                :style="{ backgroundImage: `radial-gradient(circle, ${driver.color}18 1px, transparent 1px)`, backgroundSize: '20px 20px' }" />

            <!-- Glow orbs -->
            <div class="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full blur-3xl animate-pulse"
                :style="{ backgroundColor: driver.color + '18', animationDuration: '4s' }" />
            <div class="pointer-events-none absolute -bottom-12 right-12 h-48 w-48 rounded-full blur-3xl animate-pulse"
                :style="{ backgroundColor: driver.color + '10', animationDuration: '6s' }" />

            <!-- Top accent line -->
            <div class="absolute inset-x-0 top-0 h-px"
                :style="{ background: `linear-gradient(90deg, transparent, ${driver.color}80, transparent)` }" />

            <div class="relative z-10 px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14">
                <!-- Protocol badge -->
                <div class="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-sm"
                    :style="{ borderColor: driver.color + '30', backgroundColor: driver.color + '10' }">
                    <span class="h-1.5 w-1.5 animate-pulse rounded-full" :style="{ backgroundColor: driver.color }" />
                    <span class="text-xs font-semibold uppercase tracking-widest" :style="{ color: driver.color }">
                        {{ driver.protocol }} · no_std · embedded-hal
                    </span>
                </div>

                <!-- Icon + Title -->
                <div class="mb-4 flex items-center gap-4">
                    <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-lg sm:h-16 sm:w-16"
                        :style="{ borderColor: driver.color + '30', backgroundColor: driver.color + '15' }">
                        <i class="pi text-2xl sm:text-3xl" :class="driver.icon" :style="{ color: driver.color }" />
                    </div>
                    <div>
                        <h1 class="text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
                            {{ driver.name }}
                        </h1>
                        <p class="mt-1 text-sm font-medium tracking-wide" :style="{ color: driver.color + 'aa' }">
                            {{ driver.fullName }}
                        </p>
                    </div>
                </div>

                <!-- Description -->
                <p class="mb-8 max-w-2xl text-base leading-relaxed text-white/60">
                    {{ driver.description }}
                </p>

                <!-- CTA -->
                <div class="flex flex-row flex-wrap gap-3">
                    <Button :link="driver.repo" content="Source Code" icon="pi-github"
                        background="border hover:opacity-90"
                        :style="{ borderColor: driver.color + '40', backgroundColor: driver.color + '20' }" />
                </div>
            </div>
        </div>

        <!-- ============================================================
             KEY SPECS
        ============================================================ -->
        <div class="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">

            <!-- I²C Address -->
            <div v-if="driver.i2cAddress" class="glass-card flex flex-col items-center gap-1.5 px-4 py-5 text-center">
                <div class="mb-1 flex h-8 w-8 items-center justify-center rounded-xl border"
                    :style="{ borderColor: driver.color + '20', backgroundColor: driver.color + '10' }">
                    <i class="pi pi-link text-sm" :style="{ color: driver.color }" />
                </div>
                <span class="font-mono text-lg font-bold leading-none tracking-tight sm:text-xl"
                    :style="{ color: driver.color }">
                    {{ driver.i2cAddress }}
                </span>
                <span class="text-xs leading-tight text-white/55">I²C Address</span>
            </div>

            <!-- Measurements -->
            <div v-for="m in driver.measurements" :key="m.name"
                class="glass-card flex flex-col items-center gap-1.5 px-4 py-5 text-center">
                <div class="mb-1 flex h-8 w-8 items-center justify-center rounded-xl border"
                    :style="{ borderColor: driver.color + '20', backgroundColor: driver.color + '10' }">
                    <i class="pi pi-chart-bar text-sm" :style="{ color: driver.color }" />
                </div>
                <span class="font-mono text-sm font-bold leading-none tracking-tight sm:text-base"
                    :style="{ color: driver.color }">
                    {{ m.range || m.unit }}
                </span>
                <span class="text-xs leading-tight text-white/55">{{ m.name }}</span>
            </div>
        </div>

        <!-- ============================================================
             FEATURES
        ============================================================ -->
        <div class="glass-card w-full p-6 sm:p-8" :style="themeStyle">
            <div class="flex items-center gap-2.5 mb-5">
                <div class="h-0.5 w-6 rounded-full" :style="{ backgroundColor: driver.color }" />
                <span class="text-xs font-semibold uppercase tracking-widest" :style="{ color: driver.color }">Features</span>
            </div>

            <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <li v-for="feature in driver.features" :key="feature"
                    class="flex items-start gap-3 rounded-xl border border-white/5 bg-white/2 px-4 py-3">
                    <i class="pi pi-check-circle mt-0.5 shrink-0 text-sm" :style="{ color: driver.color }" />
                    <span class="text-sm leading-snug text-white/70">{{ feature }}</span>
                </li>
            </ul>
        </div>

        <!-- ============================================================
             CODE EXAMPLE
        ============================================================ -->
        <div class="w-full">
            <div class="mb-4 flex items-center gap-2.5">
                <div class="h-0.5 w-6 rounded-full" :style="{ backgroundColor: driver.color }" />
                <span class="text-xs font-semibold uppercase tracking-widest" :style="{ color: driver.color }">Usage Example</span>
            </div>

            <div class="overflow-hidden rounded-xl border border-white/8 shadow-xl">
                <!-- Editor chrome -->
                <div class="flex items-center gap-2 border-b border-white/6 bg-[#1a1410] px-4 py-2.5">
                    <div class="flex items-center gap-1.5">
                        <div class="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <div class="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <div class="h-2.5 w-2.5 rounded-full bg-white/15" />
                    </div>
                    <div class="ml-3 rounded border border-white/8 bg-white/5 px-2.5 py-0.5">
                        <span class="font-mono text-[10px] text-white/40">main.rs</span>
                    </div>
                    <div class="ml-auto">
                        <span class="rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                            :style="{ borderColor: driver.color + '25', color: driver.color + '80', backgroundColor: driver.color + '08' }">
                            Rust
                        </span>
                    </div>
                </div>

                <!-- Code content -->
                <div class="bg-[#12100c] px-5 py-4 overflow-x-auto">
                    <pre class="font-mono text-xs sm:text-sm leading-relaxed text-white/75"><code v-html="highlightRust(driver.codeExample)" /></pre>
                </div>
            </div>
        </div>

        <!-- ============================================================
             INTEGRATION WITH BARO-RS
        ============================================================ -->
        <div class="glass-card w-full p-6 sm:p-8">
            <div class="flex items-start gap-5">
                <div class="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-baro-default/20 bg-baro-default/10">
                    <i class="pi pi-microchip text-baro-default text-xl" />
                </div>
                <div class="min-w-0 flex-1">
                    <h3 class="card-title mb-0.5">Integration with Baro-RS</h3>
                    <p class="mb-0 text-xs font-medium tracking-wide text-baro-default/70">How this driver connects to the monitoring station</p>
                    <p class="card-body mt-3 mb-0">
                        {{ driver.usedInBaroRs }}
                    </p>
                </div>
            </div>
        </div>

        <!-- ============================================================
             EXPLORE OTHER DRIVERS
        ============================================================ -->
        <div class="w-full">
            <div class="mb-4 flex items-center justify-center gap-3">
                <div class="h-px w-8 rounded-full bg-white/15" />
                <span class="text-xs font-semibold uppercase tracking-widest text-white/40">Other Drivers</span>
                <div class="h-px w-8 rounded-full bg-white/15" />
            </div>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <router-link v-for="d in otherDrivers" :key="d.id"
                    :to="{ name: 'baro-rs-driver', params: { driverId: d.id } }"
                    class="group glass-card flex items-center gap-3 p-3.5 no-underline transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors"
                        :style="{ borderColor: d.color + '25', backgroundColor: d.color + '10' }">
                        <i class="pi text-sm" :class="d.icon" :style="{ color: d.color }" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <p class="text-sm font-semibold leading-tight text-white/80 group-hover:text-white transition-colors">{{ d.name }}</p>
                        <p class="mt-0.5 text-[10px] text-white/40 truncate">{{ d.fullName }}</p>
                    </div>
                    <i class="pi pi-chevron-right text-[10px] text-white/25 transition-all duration-300 group-hover:text-white/50 group-hover:translate-x-0.5" />
                </router-link>
            </div>
        </div>

        <!-- Footer -->
        <div class="pb-4">
            <p class="mx-auto max-w-lg text-center text-xs italic leading-relaxed text-white/35">
                {{ driver.name }} is open-source under the MIT license.
                Built with embedded-hal 1.0 for maximum portability across Rust embedded platforms.
            </p>
        </div>

    </PageLayoutSpacer>
</template>
