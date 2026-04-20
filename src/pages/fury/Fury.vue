<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const base = import.meta.env.BASE_URL;

const score = ref(0);
const hiScore = ref(137420);
let scoreTimer: number | undefined;

onMounted(() => {
	scoreTimer = window.setInterval(() => {
		score.value += Math.floor(Math.random() * 90) + 10;
	}, 140);
});
onBeforeUnmount(() => {
	if (scoreTimer) window.clearInterval(scoreTimer);
});

const stats = [
	{ v: "94",  l: "MEMBERS" },
	{ v: "04",  l: "SERVERS" },
	{ v: "165", l: "CHANNELS" },
	{ v: "05",  l: "SYSTEMS" },
];

const features = [
	{ cmd: "/team manage",           title: "TEAM MANAGEMENT",       body: "Auto-provisions channels, roles, rosters, subs, captains. Restores deleted channels on its own.",    img: `${base}fury/team_manage.png` },
	{ cmd: "/scrim create",          title: "SCRIM SCHEDULING",      body: "Captain schedules; both rosters vote-confirm; Fury spins up a private channel and fires reminders.",  img: `${base}fury/scrim_confirm.png` },
	{ cmd: "/infractions manage",    title: "INFRACTION TRACKING",   body: "Rides AutoMod. Tally per member, routing config, moderator exemptions, full history dashboard.",      img: `${base}fury/infractions_management.png` },
	{ cmd: "/attachment-request",    title: "ATTACHMENT MODERATION", body: "Every image is classified for NSFW before posting. Approve / approve-silent / deny in one click.",   img: `${base}fury/attachment_requests.png` },
	{ cmd: "/practice start",        title: "PRACTICE TRACKING",     body: "Logs voice join/leave for every team member. Rolls up into team leaderboards automatically." },
];

const credits = [
	{ role: "ENGINE",    val: "Python 3" },
	{ role: "FRAMEWORK", val: "discord.py" },
	{ role: "STORAGE",   val: "PostgreSQL" },
	{ role: "DRIVER",    val: "asyncpg" },
	{ role: "VISION",    val: "NudeDetector" },
	{ role: "SERVICE",   val: "systemd" },
];
</script>

<template>
	<div class="fury-cabinet">
		<div class="fury-bg" aria-hidden="true">
			<div class="fury-bg__horizon" />
			<div class="fury-bg__grid" />
			<div class="fury-bg__scanlines" />
			<div class="fury-bg__vignette" />
		</div>

		<header class="fury-marquee">
			<div class="marquee-side marquee-side--l">
				<span class="marquee-label">1UP</span>
				<span class="marquee-score">{{ score.toLocaleString().padStart(9, "0") }}</span>
			</div>
			<div class="marquee-center">
				<span class="marquee-kicker">FLORIDA VIRTUAL SCHOOL · eSPORTS</span>
				<h1 class="marquee-title">
					<span class="mt-char" style="--d: 0ms">F</span><span class="mt-char" style="--d: 60ms">U</span><span class="mt-char" style="--d: 120ms">R</span><span class="mt-char" style="--d: 180ms">Y</span>
				</h1>
				<span class="marquee-sub">— a moderation &amp; team-management bot for a school gaming community —</span>
			</div>
			<div class="marquee-side marquee-side--r">
				<span class="marquee-label">HI-SCORE</span>
				<span class="marquee-score marquee-score--hi">{{ hiScore.toLocaleString().padStart(9, "0") }}</span>
			</div>
		</header>

		<section class="fury-coin">
			<div class="coin-blink">▸ INSERT COIN TO CONTINUE ◂</div>
			<div class="coin-links">
				<a class="coin-btn coin-btn--primary" href="https://github.com/trevorflahardy/Fury-Bot" target="_blank" rel="noreferrer noopener">
					<span class="coin-btn__pulse" /> PRESS START · SOURCE
				</a>
				<a class="coin-btn" href="https://github.com/trevorflahardy/Fury-Bot" target="_blank" rel="noreferrer noopener">
					SELECT · DEV BOARD
				</a>
			</div>
		</section>

		<section class="fury-hud">
			<div v-for="s in stats" :key="s.l" class="hud-tile">
				<span class="hud-tile__v">{{ s.v }}</span>
				<span class="hud-tile__l">{{ s.l }}</span>
			</div>
		</section>

		<section class="fury-act" data-act="ACT I — ORIGIN">
			<div class="act-inner">
				<h2 class="act-title">THE FIRST OF ITS KIND</h2>
				<p class="act-body">
					When I joined FLVS's eSports club as lead student, the job was odd:
					build a thriving competitive gaming community <em>inside</em> an accredited
					K-12 school. Policy demanded strict moderation, organized teams, and total
					accountability — and no off-the-shelf bot was built for any of it.
				</p>
				<p class="act-body">
					So I built <strong>Fury</strong> from scratch. Purpose-made for the
					constraints and responsibilities of a school environment.
				</p>
				<div class="act-screenshot">
					<img :src="`${base}fury/fury_about.png`" alt="Fury /about command showing live server stats" />
					<span class="shot-cap">/about — live stats from the FLVS server</span>
				</div>
			</div>
		</section>

		<section class="fury-act fury-act--dispatch" data-act="ACT II — SYSTEMS">
			<div class="act-inner act-inner--full">
				<h2 class="act-title">CORE SYSTEMS</h2>
				<div class="dispatch-board">
					<article
						v-for="(f, i) in features"
						:key="f.cmd"
						class="dispatch-panel"
						:class="{ 'dispatch-panel--flip': i % 2 === 1 }"
						:style="{ '--i': i }"
					>
						<div class="dispatch-meta">
							<span class="dispatch-num">{{ String(i + 1).padStart(2, "0") }}</span>
							<div class="dispatch-content">
								<code class="dispatch-cmd">{{ f.cmd }}</code>
								<h3 class="dispatch-title">{{ f.title }}</h3>
								<p class="dispatch-body">{{ f.body }}</p>
							</div>
						</div>
						<div class="dispatch-screen" :class="{ 'dispatch-screen--offline': !f.img }">
							<template v-if="f.img">
								<div class="dispatch-crt">
									<img :src="f.img" :alt="`${f.title} — ${f.cmd} screenshot`" />
								</div>
								<span class="dispatch-cap">LIVE FEED · {{ f.cmd }}</span>
							</template>
							<template v-else>
								<div class="dispatch-crt dispatch-crt--offline">
									<span class="offline-label">NO FEED</span>
									<span class="offline-sub">AUDIO ONLY</span>
								</div>
								<span class="dispatch-cap">CHANNEL ACTIVE · VISUAL UNAVAILABLE</span>
							</template>
						</div>
					</article>
				</div>
			</div>
		</section>

		<section class="fury-act" data-act="ACT III — HIGH SCORES">
			<div class="act-inner">
				<h2 class="act-title">CREDITS</h2>
				<p class="act-body act-body--tight">Built with —</p>
				<div class="credits-roll">
					<div v-for="c in credits" :key="c.role" class="credit-row">
						<span class="credit-role">{{ c.role }}</span>
						<span class="credit-dots" />
						<span class="credit-val">{{ c.val }}</span>
					</div>
				</div>
			</div>
		</section>

		<footer class="fury-footer">
			<span>© TREVOR FLAHARDY · FLVS eSPORTS</span>
			<span class="footer-dot">●</span>
			<span>ALL RIGHTS RESERVED</span>
			<span class="footer-dot">●</span>
			<span>PLAYER 1 READY</span>
		</footer>
	</div>
</template>

<style scoped>
.fury-cabinet {
	--bg: #0a0514;
	--bg-2: #1a0a2e;
	--ink: #e8f9ff;
	--mute: rgba(232, 249, 255, 0.55);
	--faint: rgba(232, 249, 255, 0.28);
	--neon: #ff2d7a;
	--neon-2: #4edbfc;
	--gold: #ffd447;
	--rule: rgba(78, 219, 252, 0.25);

	position: relative;
	width: 100%;
	min-height: 100vh;
	background: var(--bg);
	color: var(--ink);
	font-family: "Press Start 2P", "VT323", "SF Mono", ui-monospace, monospace;
	overflow: hidden;
}

.fury-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.fury-bg__horizon {
	position: absolute; inset: 0;
	background:
		radial-gradient(ellipse at 50% 0%, rgba(78, 219, 252, 0.18), transparent 55%),
		radial-gradient(ellipse at 50% 100%, rgba(255, 45, 122, 0.18), transparent 55%),
		linear-gradient(to bottom, #0a0514 0%, #180a2a 50%, #0a0514 100%);
}
.fury-bg__grid {
	position: absolute; left: -10%; right: -10%; bottom: 0; height: 55vh;
	background-image:
		linear-gradient(rgba(78, 219, 252, 0.4) 1px, transparent 1px),
		linear-gradient(90deg, rgba(78, 219, 252, 0.4) 1px, transparent 1px);
	background-size: 60px 40px;
	transform: perspective(600px) rotateX(65deg);
	transform-origin: bottom;
	mask-image: linear-gradient(to top, black 10%, transparent 90%);
	opacity: 0.4;
}
.fury-bg__scanlines {
	position: absolute; inset: 0;
	background: repeating-linear-gradient(to bottom, transparent 0 2px, rgba(0,0,0,0.18) 2px 3px);
	mix-blend-mode: overlay;
	pointer-events: none;
}
.fury-bg__vignette {
	position: absolute; inset: 0;
	background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%);
}

.fury-marquee {
	position: relative;
	z-index: 2;
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	align-items: center;
	gap: 2rem;
	padding: 2.5rem clamp(1.25rem, 4vw, 3rem) 1.5rem;
	border-bottom: 1px solid var(--rule);
}
.marquee-side { display: flex; flex-direction: column; gap: 0.4rem; }
.marquee-side--l { align-items: flex-start; }
.marquee-side--r { align-items: flex-end; }
.marquee-label {
	font-size: 0.62rem; letter-spacing: 0.25em; color: var(--neon);
	text-shadow: 0 0 8px rgba(255, 45, 122, 0.8);
}
.marquee-score {
	font-size: 1rem; letter-spacing: 0.14em; color: var(--gold);
	text-shadow: 0 0 10px rgba(255, 212, 71, 0.7);
	font-variant-numeric: tabular-nums;
}
.marquee-score--hi { color: var(--neon-2); text-shadow: 0 0 10px rgba(78, 219, 252, 0.7); }

.marquee-center { text-align: center; }
.marquee-kicker {
	display: block;
	font-size: 0.58rem; letter-spacing: 0.3em;
	color: var(--neon-2);
	margin-bottom: 0.9rem;
	text-shadow: 0 0 6px rgba(78, 219, 252, 0.6);
}
.marquee-title {
	margin: 0;
	font-size: clamp(3rem, 10vw, 6.5rem);
	line-height: 1;
	letter-spacing: 0.04em;
	color: var(--ink);
	text-shadow:
		0 0 8px rgba(255, 45, 122, 0.9),
		0 0 24px rgba(255, 45, 122, 0.5),
		0 0 48px rgba(78, 219, 252, 0.3);
}
.mt-char {
	display: inline-block;
	animation: fury-bob 2.4s ease-in-out infinite;
	animation-delay: var(--d, 0ms);
}
@keyframes fury-bob {
	0%, 100% { transform: translateY(0); }
	50%      { transform: translateY(-0.18em); }
}
.marquee-sub {
	display: block;
	margin-top: 0.9rem;
	font-family: "VT323", "SF Mono", monospace;
	font-size: 0.95rem;
	letter-spacing: 0.08em;
	color: var(--mute);
}

.fury-coin {
	position: relative; z-index: 2;
	text-align: center;
	padding: 2rem 1rem 2.5rem;
}
.coin-blink {
	font-size: 0.82rem; letter-spacing: 0.18em;
	color: var(--gold);
	text-shadow: 0 0 8px rgba(255, 212, 71, 0.65);
	animation: coin-blink 1.1s steps(2, end) infinite;
	margin-bottom: 1.25rem;
}
@keyframes coin-blink {
	0%, 49%  { opacity: 1; }
	50%, 100%{ opacity: 0.25; }
}
.coin-links { display: inline-flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center; }
.coin-btn {
	position: relative;
	display: inline-flex; align-items: center; gap: 0.5rem;
	padding: 0.9rem 1.4rem;
	font-size: 0.7rem; letter-spacing: 0.14em;
	color: var(--ink);
	background: rgba(78, 219, 252, 0.06);
	border: 2px solid rgba(78, 219, 252, 0.45);
	border-radius: 0;
	text-decoration: none;
	transition: transform 140ms ease, background 140ms ease, box-shadow 140ms ease;
	box-shadow: 0 0 0 0 rgba(78, 219, 252, 0);
}
.coin-btn:hover {
	transform: translate(-2px, -2px);
	background: rgba(78, 219, 252, 0.14);
	box-shadow: 4px 4px 0 rgba(78, 219, 252, 0.5);
}
.coin-btn--primary {
	color: var(--bg);
	background: var(--neon);
	border-color: var(--neon);
}
.coin-btn--primary:hover {
	background: var(--gold); border-color: var(--gold);
	box-shadow: 4px 4px 0 rgba(255, 212, 71, 0.6);
}
.coin-btn__pulse {
	width: 0.6rem; height: 0.6rem; border-radius: 9999px;
	background: var(--bg);
	animation: coin-pulse 1s ease-in-out infinite;
}
@keyframes coin-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.25 } }

.fury-hud {
	position: relative; z-index: 2;
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 1px;
	margin: 0 clamp(1.25rem, 4vw, 3rem);
	background: var(--rule);
	border: 1px solid var(--rule);
}
@media (max-width: 640px) { .fury-hud { grid-template-columns: repeat(2, 1fr); } }
.hud-tile {
	display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
	padding: 1.4rem 0.75rem;
	background: rgba(10, 5, 20, 0.7);
}
.hud-tile__v {
	font-size: clamp(1.8rem, 4vw, 2.6rem);
	color: var(--neon-2);
	text-shadow: 0 0 12px rgba(78, 219, 252, 0.6);
	font-variant-numeric: tabular-nums;
}
.hud-tile__l {
	font-size: 0.56rem; letter-spacing: 0.22em;
	color: var(--mute);
}

.fury-act {
	position: relative; z-index: 2;
	padding: 5rem clamp(1.25rem, 4vw, 3rem);
}
.fury-act::before {
	content: attr(data-act);
	position: absolute;
	top: 2rem; left: clamp(1.25rem, 4vw, 3rem);
	font-size: 0.58rem; letter-spacing: 0.3em;
	color: var(--neon);
	text-shadow: 0 0 8px rgba(255, 45, 122, 0.6);
}
.fury-act + .fury-act { border-top: 1px dashed var(--rule); }
.act-inner { max-width: 1080px; margin: 0 auto; }
.act-title {
	font-size: clamp(1.4rem, 3vw, 2rem);
	letter-spacing: 0.08em;
	margin: 1.5rem 0 1.5rem;
	color: var(--ink);
	text-shadow: 0 0 10px rgba(78, 219, 252, 0.4);
}
.act-body {
	font-family: "VT323", "SF Mono", monospace;
	font-size: 1.15rem;
	line-height: 1.55;
	letter-spacing: 0.03em;
	color: var(--mute);
	max-width: 62ch;
	margin: 0 0 1rem;
}
.act-body--tight { margin-bottom: 0.5rem; }
.act-body em { color: var(--gold); font-style: normal; }
.act-body strong { color: var(--neon); font-weight: inherit; }

.act-screenshot {
	margin-top: 2rem;
	max-width: 560px;
	border: 2px solid var(--rule);
	padding: 0.6rem;
	background: rgba(10, 5, 20, 0.6);
}
.act-screenshot img { width: 100%; display: block; }
.shot-cap {
	display: block;
	margin-top: 0.5rem;
	font-family: "VT323", monospace;
	font-size: 0.9rem;
	color: var(--faint);
	text-align: center;
	letter-spacing: 0.05em;
}

.act-inner--full { max-width: 1200px; }
.fury-act--dispatch { padding-left: 0; padding-right: 0; }
.fury-act--dispatch .act-inner--full { padding: 0 clamp(1.25rem, 4vw, 3rem); max-width: none; }
.fury-act--dispatch .act-title { padding: 0; }

@keyframes sys-in {
	from { opacity: 0; transform: translateY(10px); }
	to   { opacity: 1; transform: translateY(0); }
}

/* Dispatch board — full-width stacked cinematic panels */
.dispatch-board {
	margin-top: 2.5rem;
	border: 1px solid var(--rule);
}

.dispatch-panel {
	display: grid;
	grid-template-columns: 1fr 1fr;
	min-height: 300px;
	border-bottom: 1px solid var(--rule);
	animation: sys-in 500ms ease-out both;
	animation-delay: calc(var(--i, 0) * 100ms);
}
.dispatch-panel:last-child { border-bottom: none; }
.dispatch-panel--flip { direction: rtl; }
.dispatch-panel--flip > * { direction: ltr; }

/* Meta (text) half */
.dispatch-meta {
	display: flex;
	border-right: 1px solid var(--rule);
}
.dispatch-panel--flip .dispatch-meta {
	border-right: none;
	border-left: 1px solid var(--rule);
}

.dispatch-num {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 3.25rem;
	padding: 1.5rem 0;
	font-size: 2.4rem;
	color: rgba(78, 219, 252, 0.10);
	border-right: 1px solid var(--rule);
	letter-spacing: -0.03em;
	writing-mode: vertical-rl;
	text-orientation: mixed;
	transform: rotate(180deg);
	user-select: none;
	flex-shrink: 0;
}
.dispatch-panel--flip .dispatch-num {
	border-right: none;
	border-left: 1px solid var(--rule);
}

.dispatch-content {
	padding: 2rem 2rem 2rem 1.75rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 0.5rem;
}

.dispatch-cmd {
	font-family: "VT323", monospace;
	font-size: 1.45rem;
	color: var(--gold);
	letter-spacing: 0.06em;
	text-shadow: 0 0 8px rgba(255, 212, 71, 0.4);
}
.dispatch-title {
	font-size: clamp(0.78rem, 1.3vw, 0.95rem);
	letter-spacing: 0.12em;
	color: var(--ink);
	margin: 0.2rem 0 0.4rem;
	text-shadow: 0 0 8px rgba(78, 219, 252, 0.3);
}
.dispatch-body {
	font-family: "VT323", monospace;
	font-size: 1.2rem;
	line-height: 1.55;
	letter-spacing: 0.02em;
	color: var(--mute);
	margin: 0;
}

/* Screenshot (screen) half */
.dispatch-screen {
	position: relative;
	display: flex;
	flex-direction: column;
	background: #020108;
	padding: 1.25rem 1.5rem 0.75rem;
	gap: 0.6rem;
}
.dispatch-screen--offline { background: #030210; }

.dispatch-crt {
	flex: 1;
	position: relative;
	border: 1px solid rgba(78, 219, 252, 0.25);
	background: #020108;
	overflow: hidden;
	box-shadow:
		inset 0 0 24px rgba(78, 219, 252, 0.04),
		0 0 0 1px rgba(78, 219, 252, 0.06);
}
.dispatch-crt::after {
	content: '';
	position: absolute;
	inset: 0;
	background: repeating-linear-gradient(
		to bottom,
		transparent 0 2px,
		rgba(0, 0, 0, 0.2) 2px 3px
	);
	pointer-events: none;
	z-index: 2;
}
.dispatch-crt img {
	width: 100%;
	display: block;
	opacity: 0.9;
	filter: saturate(0.82) brightness(0.94);
}

.dispatch-crt--offline {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.6rem;
	min-height: 200px;
	background: repeating-linear-gradient(
		45deg,
		rgba(78, 219, 252, 0.025) 0px,
		rgba(78, 219, 252, 0.025) 1px,
		transparent 1px,
		transparent 9px
	);
}
.offline-label {
	font-size: 1.5rem;
	letter-spacing: 0.2em;
	color: rgba(78, 219, 252, 0.35);
	text-shadow: 0 0 12px rgba(78, 219, 252, 0.2);
}
.offline-sub {
	font-family: "VT323", monospace;
	font-size: 1.1rem;
	letter-spacing: 0.14em;
	color: rgba(78, 219, 252, 0.2);
}

.dispatch-cap {
	font-family: "VT323", monospace;
	font-size: 0.82rem;
	letter-spacing: 0.1em;
	color: var(--faint);
	text-align: right;
	flex-shrink: 0;
}

@media (max-width: 720px) {
	.dispatch-panel { grid-template-columns: 1fr; min-height: unset; }
	.dispatch-panel--flip { direction: ltr; }
	.dispatch-meta { border-right: none; border-bottom: 1px solid var(--rule); }
	.dispatch-panel--flip .dispatch-meta { border-left: none; border-bottom: 1px solid var(--rule); }
	.dispatch-screen { min-height: 220px; }
	.dispatch-num { writing-mode: horizontal-tb; transform: none; min-width: unset; padding: 0.75rem 1rem; font-size: 1.6rem; border-right: 1px solid var(--rule); border-left: none !important; }
}

.credits-roll { margin-top: 1.25rem; border-top: 1px dashed var(--rule); }
.credit-row {
	display: flex; align-items: baseline; gap: 0.75rem;
	padding: 0.85rem 0;
	border-bottom: 1px dashed var(--rule);
}
.credit-role {
	font-size: 0.62rem; letter-spacing: 0.22em; color: var(--neon);
	min-width: 6.5rem;
}
.credit-dots {
	flex: 1;
	border-bottom: 1px dotted var(--faint);
	transform: translateY(-2px);
}
.credit-val {
	font-family: "VT323", monospace;
	font-size: 1.15rem;
	color: var(--ink);
	letter-spacing: 0.05em;
}

.fury-footer {
	position: relative; z-index: 2;
	display: flex; justify-content: center; align-items: center; gap: 0.8rem;
	padding: 1.4rem 1rem;
	font-size: 0.58rem; letter-spacing: 0.22em;
	color: var(--faint);
	border-top: 1px solid var(--rule);
	flex-wrap: wrap;
}
.footer-dot { color: var(--neon); }

@media (prefers-reduced-motion: reduce) {
	.mt-char, .coin-blink, .coin-btn__pulse, .dispatch-panel { animation: none !important; }
}
</style>
