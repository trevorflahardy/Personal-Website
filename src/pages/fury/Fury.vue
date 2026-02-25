<script setup lang="ts">
import PageLayoutSpacer from '@/components/PageLayoutSpacer.vue';
import Button from '@/components/Button.vue';
import { icon as furyIcon } from './info';

// Vite base URL — required for public/ assets when base !== "/"
const base = import.meta.env.BASE_URL;

const stats = [
    { value: '94', label: 'Members Served', icon: 'pi-users' },
    { value: '4', label: 'Active Servers', icon: 'pi-globe' },
    { value: '165', label: 'Channels Managed', icon: 'pi-comment' },
    { value: '5', label: 'Core Systems', icon: 'pi-cog' },
];

const features = [
    {
        icon: 'pi-users',
        title: 'Team Management',
        subtitle: 'Full team lifecycle — automated.',
        command: '/team manage',
        description:
            'Fury provisions everything a team needs in one command: private channels, role-gated access, configurable rosters, substitute slots, and captain designations. Every detail lives in a single Discord panel — no manual setup, ever.',
        bullets: [
            'Auto-provisions text & voice channels per team',
            'Members, subs & captains with distinct permissions',
            'Custom team names, logos & descriptions',
            'Auto-restores accidentally deleted channels',
        ],
        screenshot: `${base}fury/team_manage.png`,
        alt: 'Team management panel in Discord',
        flip: false,
    },
    {
        icon: 'pi-calendar',
        title: 'Scrim Scheduling',
        subtitle: 'Democratic match confirmation.',
        command: '/scrim create',
        description:
            "Captains schedule practice matches at a set time. Both rosters must vote-confirm their attendance before Fury spins up a private scrim channel and fires automated reminders — no show-up surprises, ever.",
        bullets: [
            'Schedule matches between any two registered teams',
            'Vote-to-confirm ensures both sides are ready',
            'Auto-creates scrim-only private channels',
            'Automated reminders and post-scrim cleanup',
        ],
        screenshot: `${base}fury/scrim_confirm.png`,
        alt: 'Scrim confirmation voting message in Discord',
        flip: true,
    },
    {
        icon: 'pi-shield',
        title: 'Infraction Tracking',
        subtitle: 'AutoMod integration, visualized.',
        command: '/infractions manage',
        description:
            "Layered on top of Discord's native AutoMod, Fury maintains a running tally of every violation across the server. Moderators get a full dashboard to configure routing, review member histories, and catch repeat offenders before they become problems.",
        bullets: [
            "Hooks directly into Discord's AutoMod event stream",
            'Per-member violation counters with full history',
            'Configurable notification channel routing',
            'Role-based moderator exemptions & access controls',
        ],
        screenshot: `${base}fury/infractions_management.png`,
        alt: 'Infraction settings management panel in Discord',
        flip: false,
    },
    {
        icon: 'pi-image',
        title: 'Attachment Moderation',
        subtitle: 'Nothing posts without approval.',
        command: '/attachment-request',
        description:
            'Students submit image requests before anything appears in a channel. Each submission is automatically classified for NSFW content — giving moderators a real confidence score before they approve or deny. Keeping content age-appropriate, always.',
        bullets: [
            'Students submit up to 4 attachments per request',
            'Automatic NSFW classification with confidence scores',
            'One-click approve / approve without message / deny',
            'Full audit log stored for every decision',
        ],
        screenshot: `${base}fury/attachment_requests.png`,
        alt: 'Attachment request approval panel in Discord',
        flip: true,
    },
];

const scrimSteps = [
    { n: '01', title: 'Captain Schedules', body: 'A captain runs /scrim create, picks the opponent team, sets a time, and configures the player count.' },
    { n: '02', title: 'Teams Vote', body: 'Fury pings both teams. Each player clicks Confirm — the scrim only proceeds once both rosters hit the required threshold.' },
    { n: '03', title: 'Channel Spins Up', body: 'Once confirmed, Fury creates a private scrim channel with permissions locked to the participating players and captains only.' },
    { n: '04', title: 'Reminders Fire', body: 'Automated reminders go out leading up to game time. After the scrim, Fury cleans up the channel and logs the result.' },
];

const techStack = [
    { name: 'Python', icon: 'pi-code', desc: 'Core runtime' },
    { name: 'discord.py', icon: 'pi-discord', desc: 'Discord API framework' },
    { name: 'PostgreSQL', icon: 'pi-database', desc: 'Persistent storage' },
    { name: 'asyncpg', icon: 'pi-bolt', desc: 'Async DB driver' },
    { name: 'NudeDetector', icon: 'pi-eye', desc: 'NSFW classification' },
    { name: 'systemd', icon: 'pi-server', desc: 'Process management' },
];
</script>

<template>
    <PageLayoutSpacer>

        <!-- ============================================================
             HERO
        ============================================================ -->
        <div class="relative w-full overflow-hidden rounded-2xl border border-white/8 shadow-xl">

            <!-- Layered backgrounds -->
            <div class="absolute inset-0 bg-[#0d1117]" />
            <div class="absolute inset-0 bg-linear-to-br from-fury/8 via-transparent to-transparent" />

            <!-- Dot grid texture -->
            <div
                class="absolute inset-0 opacity-40"
                style="background-image: radial-gradient(circle, rgba(78,219,252,0.18) 1px, transparent 1px); background-size: 28px 28px;"
            />

            <!-- Glow orbs -->
            <div class="pointer-events-none absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-fury/25 blur-3xl" />
            <div class="pointer-events-none absolute -bottom-16 right-16 h-64 w-64 rounded-full bg-fury/12 blur-3xl" />

            <!-- Top accent line -->
            <div class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-fury/80 to-transparent" />

            <div class="relative z-10 px-8 py-12 sm:px-12 sm:py-14 md:px-14 md:py-16">

                <!-- Origin badge -->
                <div class="mb-7 inline-flex items-center gap-2 rounded-full border border-fury/30 bg-fury/10 px-3.5 py-1.5 backdrop-blur-sm">
                    <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-fury" />
                    <span class="text-xs font-semibold uppercase tracking-widest text-fury">
                        Florida Virtual School · eSports
                    </span>
                </div>

                <!-- Logo + Title -->
                <div class="mb-5 flex items-center gap-4">
                    <img
                        :src="furyIcon"
                        alt="Fury bot icon"
                        class="h-14 w-14 shrink-0 rounded-2xl shadow-lg shadow-black/50 sm:h-16 sm:w-16"
                    />
                    <h1 class="text-5xl font-bold leading-none tracking-tight text-white sm:text-6xl md:text-7xl">
                        Fury<span class="text-fury">.</span>
                    </h1>
                </div>

                <!-- Tagline -->
                <p class="mb-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                    A Discord moderation and team management bot built for a school eSports community —
                    the first of its kind at an accredited K-12 institution. Keeping competitive
                    gaming safe, structured, and accountable.
                </p>

                <!-- Command chips row -->
                <div class="mb-8 flex flex-wrap gap-2">
                    <span
                        v-for="cmd in ['/team manage', '/scrim create', '/infractions manage', '/attachment-request', '/practice start']"
                        :key="cmd"
                        class="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/50 backdrop-blur-sm"
                    >
                        <span class="text-fury">/</span>{{ cmd.slice(1) }}
                    </span>
                </div>

                <!-- CTAs -->
                <div class="flex flex-row flex-wrap gap-3">
                    <Button
                        link="https://github.com/trevorflahardy/Fury-Bot"
                        content="Source Code"
                        icon="pi-github"
                        background="bg-fury/20 hover:bg-fury/30 border border-fury/40"
                    />
                    <Button
                        link="https://github.com/trevorflahardy/Fury-Bot"
                        content="Dev Board"
                        icon="pi-book"
                        background="bg-white/6 hover:bg-white/10 border border-white/10"
                    />
                </div>
            </div>
        </div>

        <!-- ============================================================
             STATS
        ============================================================ -->
        <div class="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            <div
                v-for="stat in stats"
                :key="stat.value"
                class="glass-card flex flex-col items-center gap-1.5 px-4 py-5 text-center"
            >
                <div class="mb-1 flex h-8 w-8 items-center justify-center rounded-xl border border-fury/20 bg-fury/10">
                    <i class="pi text-fury text-sm" :class="stat.icon" />
                </div>
                <span class="text-2xl font-bold leading-none tracking-tight text-fury sm:text-3xl">{{ stat.value }}</span>
                <span class="text-xs leading-tight text-white/55">{{ stat.label }}</span>
            </div>
        </div>

        <!-- ============================================================
             ORIGIN STORY
        ============================================================ -->
        <div class="glass-card flex w-full flex-col items-start gap-7 p-6 sm:p-8 md:flex-row md:gap-10">

            <div class="min-w-0 flex-1">
                <div class="mb-4 flex items-center gap-2.5">
                    <div class="h-0.5 w-6 rounded-full bg-fury" />
                    <span class="text-xs font-semibold uppercase tracking-widest text-fury">Origin Story</span>
                </div>
                <h2 class="title-2 mb-0">The first of its kind.</h2>
                <p class="body mt-3">
                    When I joined Florida Virtual School's eSports club as lead student, we faced a unique
                    challenge: building a thriving competitive gaming community inside an accredited K-12
                    school. The club needed its first-ever Discord server — but school policy demanded strict
                    content moderation, organized team management, and full accountability at every level.
                </p>
                <p class="body mb-0">
                    No existing bot was built for this. So I built Fury from scratch — purpose-designed for
                    the constraints and responsibilities of a school environment.
                </p>
            </div>

            <!-- /about screenshot -->
            <div class="w-full shrink-0 md:w-68 xl:w-76">
                <div class="overflow-hidden rounded-xl border border-white/8 bg-discord-400 p-2.5 shadow-xl shadow-black/50">
                    <img
                        :src="`${base}fury/fury_about.png`"
                        alt="Fury /about command showing live server stats"
                        class="w-full rounded-lg"
                    />
                </div>
                <p class="mt-2 text-center text-xs italic text-white/35">/about — live stats from the FLVS server.</p>
            </div>
        </div>

        <!-- ============================================================
             FEATURES HEADER
        ============================================================ -->
        <div class="text-center">
            <div class="mb-3 flex items-center justify-center gap-3">
                <div class="h-px w-10 rounded-full bg-fury/40" />
                <span class="text-xs font-semibold uppercase tracking-widest text-fury">Core Features</span>
                <div class="h-px w-10 rounded-full bg-fury/40" />
            </div>
            <h2 class="title-2 mb-2">Built for every edge case.</h2>
            <p class="subtitle">From team rosters to real-time content moderation — Fury handles it end to end.</p>
        </div>

        <!-- ============================================================
             FEATURE CARDS
        ============================================================ -->
        <div class="flex w-full flex-col gap-5 sm:gap-6">
            <div
                v-for="feature in features"
                :key="feature.title"
                class="glass-card w-full overflow-hidden p-5 sm:p-7"
            >
                <div
                    class="flex flex-col items-start gap-6"
                    :class="feature.flip ? 'lg:flex-row-reverse' : 'lg:flex-row'"
                >
                    <!-- Text side -->
                    <div class="min-w-0 flex-1">

                        <!-- Command chip -->
                        <div class="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-fury/20 bg-fury/8 px-2.5 py-1">
                            <span class="font-mono text-xs font-semibold text-fury">{{ feature.command }}</span>
                        </div>

                        <div class="mb-4 flex items-center gap-3">
                            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-fury/20 bg-fury/10">
                                <i class="pi text-fury text-base" :class="feature.icon" />
                            </div>
                            <div>
                                <h3 class="card-title mb-0 leading-snug">{{ feature.title }}</h3>
                                <p class="mt-0.5 text-xs font-medium tracking-wide text-fury/70">{{ feature.subtitle }}</p>
                            </div>
                        </div>

                        <p class="card-body mb-5">{{ feature.description }}</p>

                        <ul class="flex flex-col gap-2.5">
                            <li
                                v-for="bullet in feature.bullets"
                                :key="bullet"
                                class="flex items-start gap-2.5 text-sm leading-snug text-white/70"
                            >
                                <i class="pi pi-check-circle mt-0.5 shrink-0 text-sm text-fury" />
                                <span>{{ bullet }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Screenshot side -->
                    <div class="w-full shrink-0 lg:w-[46%]">
                        <div class="overflow-hidden rounded-xl border border-white/8 bg-discord-400 p-2.5 shadow-xl shadow-black/50">
                            <!-- Discord-style window chrome -->
                            <div class="mb-2 flex items-center gap-1.5 px-1">
                                <div class="h-2 w-2 rounded-full bg-white/15" />
                                <div class="h-2 w-2 rounded-full bg-white/15" />
                                <div class="h-2 w-2 rounded-full bg-white/15" />
                                <span class="ml-2 font-mono text-xs text-white/25">{{ feature.command }}</span>
                            </div>
                            <img
                                :src="feature.screenshot"
                                :alt="feature.alt"
                                class="w-full rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             SCRIM WORKFLOW TIMELINE
        ============================================================ -->
        <div class="w-full">
            <div class="mb-6 text-center">
                <div class="mb-3 flex items-center justify-center gap-3">
                    <div class="h-px w-8 rounded-full bg-fury/35" />
                    <span class="text-xs font-semibold uppercase tracking-widest text-fury/70">Scrim Workflow</span>
                    <div class="h-px w-8 rounded-full bg-fury/35" />
                </div>
                <h2 class="title-2 mb-2">From schedule to game time.</h2>
                <p class="subtitle">The four-step lifecycle every scrim goes through.</p>
            </div>

            <div class="relative flex flex-col gap-0 sm:grid sm:grid-cols-4 sm:gap-0">
                <!-- Connecting line (desktop) -->
                <div class="absolute left-0 right-0 top-5 hidden h-px bg-linear-to-r from-fury/20 via-fury/40 to-fury/20 sm:block" style="top: 1.25rem;" />

                <div
                    v-for="(step, i) in scrimSteps"
                    :key="step.n"
                    class="relative flex flex-col items-start gap-3 sm:items-center sm:px-3 sm:text-center"
                    :class="i !== scrimSteps.length - 1 ? 'pb-6 sm:pb-0' : ''"
                >
                    <!-- Step node -->
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fury/30 bg-fury/12 backdrop-blur-sm sm:z-10">
                        <span class="font-mono text-xs font-bold text-fury">{{ step.n }}</span>
                    </div>

                    <!-- Vertical connecting line (mobile) -->
                    <div v-if="i !== scrimSteps.length - 1" class="absolute left-[19px] top-10 h-6 w-px bg-fury/20 sm:hidden" />

                    <div class="pl-14 sm:pl-0">
                        <p class="mb-1 text-sm font-semibold text-white/90">{{ step.title }}</p>
                        <p class="text-xs leading-relaxed text-white/50">{{ step.body }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             PRACTICE TRACKING
        ============================================================ -->
        <div class="glass-card w-full p-6 sm:p-8">
            <div class="flex items-start gap-5">
                <div class="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-fury/20 bg-fury/10">
                    <i class="pi pi-clock text-fury text-xl" />
                </div>
                <div class="min-w-0 flex-1">
                    <div class="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-fury/20 bg-fury/8 px-2.5 py-1">
                        <span class="font-mono text-xs font-semibold text-fury">/practice start</span>
                    </div>
                    <h3 class="card-title mb-0.5">Practice Tracking</h3>
                    <p class="mb-4 text-xs font-medium tracking-wide text-fury/70">Automatic voice participation logging.</p>
                    <p class="card-body mb-5">
                        Team members start a practice session and Fury tracks every join and leave
                        event in the team voice channel automatically. Participation data rolls up into
                        per-team leaderboards — no manual check-ins, no spreadsheets.
                    </p>
                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div class="rounded-xl border border-fury/15 bg-fury/6 p-4 text-center">
                            <p class="mb-0.5 text-sm font-semibold text-white/90">Auto-Track</p>
                            <p class="text-xs text-white/50">Voice join/leave events logged in real time</p>
                        </div>
                        <div class="rounded-xl border border-fury/15 bg-fury/6 p-4 text-center">
                            <p class="mb-0.5 text-sm font-semibold text-white/90">Leaderboards</p>
                            <p class="text-xs text-white/50">Practice time rankings per team</p>
                        </div>
                        <div class="rounded-xl border border-fury/15 bg-fury/6 p-4 text-center">
                            <p class="mb-0.5 text-sm font-semibold text-white/90">Validated</p>
                            <p class="text-xs text-white/50">Confirms team membership before recording</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             BOT SIGNATURE BANNER
        ============================================================ -->
        <div class="relative w-full overflow-hidden rounded-2xl border border-fury/15 bg-discord-400">
            <div class="pointer-events-none absolute inset-0 bg-linear-to-r from-fury/6 to-transparent" />
            <div class="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-fury/5 to-transparent" />
            <div class="relative z-10 flex items-center gap-4 p-5 sm:p-6">
                <img :src="furyIcon" alt="Fury bot" class="h-12 w-12 shrink-0 rounded-xl shadow-md" />
                <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold text-white/90">Fury <span class="ml-1.5 rounded bg-fury/20 px-1.5 py-0.5 font-mono text-xs text-fury">APP</span></p>
                    <p class="mt-0.5 text-xs text-white/50">A bot focused on moderation and utility safe for a school environment — serving 94 members across 4 servers.</p>
                </div>
                <div class="hidden shrink-0 flex-col items-end gap-1 sm:flex">
                    <span class="text-xs text-white/30">Latency</span>
                    <span class="font-mono text-sm font-semibold text-fury">111 ms</span>
                </div>
            </div>
        </div>

        <!-- ============================================================
             TECH STACK
        ============================================================ -->
        <div class="w-full">
            <div class="mb-5 flex items-center justify-center gap-3">
                <div class="h-px w-8 rounded-full bg-fury/30" />
                <span class="text-xs font-semibold uppercase tracking-widest text-fury/65">Built With</span>
                <div class="h-px w-8 rounded-full bg-fury/30" />
            </div>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                <div
                    v-for="tech in techStack"
                    :key="tech.name"
                    class="glass-card flex items-center gap-3 p-3.5 sm:p-4"
                >
                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-fury/20 bg-fury/10">
                        <i class="pi text-fury text-sm" :class="tech.icon" />
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
                Fury was built and maintained while I was a student at Florida Virtual School.
                It is open-source and available on GitHub.
            </p>
        </div>

    </PageLayoutSpacer>
</template>
