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
	{
		cmd: "/team manage",
		title: "TEAM MANAGEMENT",
		body: "Auto-provisions channels, roles, rosters, subs, captains. Restores deleted channels on its own.",
		why: "Running a school esports club means constant roster churn — students join, leave, and get promoted every semester. Before Fury, every change meant hours of manual Discord admin. Now a single command re-provisions everything a team needs, and if a student accidentally deletes a channel, it's rebuilt in seconds. The bot absorbs the administrative overhead so staff can focus on the game.",
		img: `${base}fury/team_manage.png`
	},
	{
		cmd: "/scrim create",
		title: "SCRIM SCHEDULING",
		body: "Captain schedules; both rosters vote-confirm; Fury spins up a private channel and fires reminders.",
		why: "School scrims kept falling apart — teams would schedule, then half the roster wouldn't show. The vote-confirm flow changes that: if your team commits, you're on record. No-shows can be tracked, captains stay accountable, and the dedicated private channel keeps both teams coordinated without flooding the main server. It turned informal arrangements into binding commitments.",
		img: `${base}fury/scrim_confirm.png`
	},
	{
		cmd: "/infractions manage",
		title: "INFRACTION TRACKING",
		body: "Rides AutoMod. Tally per member, routing config, moderator exemptions, full history dashboard.",
		why: "K-12 esports clubs have real accountability requirements — school administration needs documented evidence for disciplinary reports. A shared spreadsheet collapses under 90 active students. Fury automatically routes every AutoMod flag, tallies infractions per member, and maintains a timestamped history. Staff can pull a clean report for any student at any time, making every decision defensible.",
		img: `${base}fury/infractions_management.png`
	},
	{
		cmd: "/attachment-request",
		title: "ATTACHMENT MODERATION",
		body: "Every image is classified for NSFW before posting. Approve / approve-silent / deny in one click.",
		why: "One inappropriate image in a K-12 Discord is a serious policy violation with real administrative consequences. Manual post-hoc moderation is reactive — by the time a moderator sees it, students already have. Fury's AI-first classification makes it proactive: every image is screened before it reaches anyone. Staff approval is a single click in a dedicated moderation channel, and the school admin never has to hear about it.",
		img: `${base}fury/attachment_requests.png`
	},
	{
		cmd: "/practice start",
		title: "PRACTICE TRACKING",
		body: "Logs voice join/leave for every team member. Rolls up into team leaderboards automatically.",
		why: "Coaches deserve real data. Before this feature, starting lineup decisions were made on gut instinct and social dynamics. Now every practice session is logged automatically — who showed up, for how long, across how many weeks. At roster review time, the leaderboard speaks for itself. It also motivates players: they can see exactly where they rank in commitment, not just in skill.",
	},
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

		<section class="fury-act fury-act--stages" data-act="ACT II — SYSTEMS">
			<div class="act-inner act-inner--wide">
				<h2 class="act-title">CORE SYSTEMS</h2>
				<div class="stage-list">
					<article v-for="(f, i) in features" :key="f.cmd" class="stage" :style="{ '--i': i }">
						<div class="stage-rule-row">
							<span class="stage-num">STAGE {{ String(i + 1).padStart(2, "0") }}</span>
							<span class="stage-rule" />
							<span class="stage-title-tag">{{ f.title }}</span>
						</div>
						<template v-if="f.img">
							<div class="stage-crt">
								<div class="stage-crt__feed-tag">● LIVE</div>
								<img :src="f.img" :alt="`${f.title} — ${f.cmd}`" class="stage-crt__img" />
								<div class="stage-crt__scanlines" aria-hidden="true" />
								<div class="stage-crt__corners" aria-hidden="true"><span /><span /><span /><span /></div>
							</div>
						</template>
						<template v-else>
							<div class="stage-crt stage-crt--offline">
								<div class="stage-crt__noise" aria-hidden="true" />
								<div class="stage-crt__offline-text">
									<span class="offline-label">SIGNAL LOST</span>
									<span class="offline-sub">AUDIO CHANNEL ACTIVE</span>
								</div>
								<div class="stage-crt__scanlines" aria-hidden="true" />
								<div class="stage-crt__corners" aria-hidden="true"><span /><span /><span /><span /></div>
							</div>
						</template>
						<div class="stage-info">
							<code class="stage-cmd">{{ f.cmd }}</code>
						</div>
						<p class="stage-body">{{ f.body }}</p>
						<p v-if="f.why" class="stage-why">{{ f.why }}</p>
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

@keyframes sys-in {
	from { opacity: 0; transform: translateY(10px); }
	to   { opacity: 1; transform: translateY(0); }
}

/* ── Stage showcase ── */
.act-inner--wide { max-width: 860px; }

.stage-list {
	margin-top: 3rem;
	display: flex;
	flex-direction: column;
	gap: 4.5rem;
}

.stage {
	animation: sys-in 500ms ease-out both;
	animation-delay: calc(var(--i, 0) * 120ms);
}

.stage-rule-row {
	display: flex;
	align-items: center;
	gap: 0.9rem;
	margin-bottom: 1.25rem;
}
.stage-num {
	font-size: 0.56rem;
	letter-spacing: 0.28em;
	color: var(--neon);
	text-shadow: 0 0 8px rgba(255, 45, 122, 0.6);
	flex-shrink: 0;
}
.stage-rule {
	flex: 1;
	height: 1px;
	background: linear-gradient(to right, rgba(78, 219, 252, 0.5), rgba(78, 219, 252, 0.04));
}
.stage-title-tag {
	font-size: 0.58rem;
	letter-spacing: 0.22em;
	color: var(--neon-2);
	text-shadow: 0 0 8px rgba(78, 219, 252, 0.5);
	flex-shrink: 0;
}

/* CRT screen */
.stage-crt {
	position: relative;
	background: #010108;
	border: 2px solid rgba(78, 219, 252, 0.18);
	box-shadow:
		0 0 0 1px rgba(78, 219, 252, 0.05),
		0 0 48px rgba(78, 219, 252, 0.05),
		inset 0 0 40px rgba(0, 0, 0, 0.7);
	overflow: hidden;
}
.stage-crt__feed-tag {
	position: absolute;
	top: 0.65rem;
	left: 0.85rem;
	z-index: 5;
	font-size: 0.52rem;
	letter-spacing: 0.18em;
	color: var(--neon);
	text-shadow: 0 0 6px rgba(255, 45, 122, 0.9);
	animation: feed-pulse 2s steps(2, end) infinite;
}
@keyframes feed-pulse {
	0%, 65%  { opacity: 1; }
	66%, 100% { opacity: 0.25; }
}
.stage-crt__img {
	display: block;
	width: 100%;
	height: auto;
	opacity: 0.92;
	filter: saturate(0.82) brightness(0.93);
}
.stage-crt--offline {
	min-height: 220px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.stage-crt__noise {
	position: absolute;
	inset: 0;
	background-image:
		repeating-linear-gradient(0deg, rgba(78, 219, 252, 0.03) 0 1px, transparent 1px 3px),
		repeating-linear-gradient(90deg, rgba(255, 45, 122, 0.02) 0 1px, transparent 1px 5px);
	animation: noise-shift 0.35s steps(3) infinite;
}
@keyframes noise-shift {
	0%   { background-position: 0 0, 0 0; }
	33%  { background-position: 0 -3px, 2px 0; }
	66%  { background-position: 0 1px, -2px 0; }
	100% { background-position: 0 0, 0 0; }
}
.stage-crt__offline-text {
	position: relative;
	z-index: 3;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6rem;
}
.offline-label {
	font-size: 1.2rem;
	letter-spacing: 0.24em;
	color: rgba(78, 219, 252, 0.38);
	text-shadow: 0 0 14px rgba(78, 219, 252, 0.22);
}
.offline-sub {
	font-family: "VT323", monospace;
	font-size: 1.1rem;
	letter-spacing: 0.12em;
	color: rgba(78, 219, 252, 0.2);
}
.stage-crt__scanlines {
	position: absolute;
	inset: 0;
	background: repeating-linear-gradient(
		to bottom,
		transparent 0 2px,
		rgba(0, 0, 0, 0.18) 2px 3px
	);
	pointer-events: none;
	z-index: 3;
}
.stage-crt__corners {
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 4;
}
.stage-crt__corners span {
	position: absolute;
	width: 16px;
	height: 16px;
	border-color: rgba(78, 219, 252, 0.55);
	border-style: solid;
}
.stage-crt__corners span:nth-child(1) { top: 7px;    left: 7px;    border-width: 2px 0 0 2px; }
.stage-crt__corners span:nth-child(2) { top: 7px;    right: 7px;   border-width: 2px 2px 0 0; }
.stage-crt__corners span:nth-child(3) { bottom: 7px; left: 7px;    border-width: 0 0 2px 2px; }
.stage-crt__corners span:nth-child(4) { bottom: 7px; right: 7px;   border-width: 0 2px 2px 0; }

/* Info bar */
.stage-info {
	display: flex;
	align-items: center;
	gap: 1.25rem;
	padding: 0.85rem 0 0.5rem;
	border-top: 1px dashed var(--rule);
	margin-top: 0.75rem;
}
.stage-cmd {
	font-family: "VT323", monospace;
	font-size: 1.3rem;
	color: var(--gold);
	letter-spacing: 0.06em;
	text-shadow: 0 0 8px rgba(255, 212, 71, 0.4);
	white-space: nowrap;
	flex-shrink: 0;
}
.stage-body {
	font-family: "VT323", monospace;
	font-size: 1.18rem;
	line-height: 1.55;
	letter-spacing: 0.02em;
	color: var(--mute);
	margin: 0 0 0.75rem;
}
.stage-why {
	font-family: "VT323", monospace;
	font-size: 1.05rem;
	line-height: 1.6;
	letter-spacing: 0.01em;
	color: rgba(232, 249, 255, 0.42);
	margin: 0;
	padding: 0.75rem 1rem;
	border-left: 1px solid var(--rule);
	background: rgba(78, 219, 252, 0.025);
	border-radius: 0 2px 2px 0;
}

@media (max-width: 560px) {
	.stage-list { gap: 3rem; }
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
	.mt-char, .coin-blink, .coin-btn__pulse, .stage, .stage-crt__noise { animation: none !important; }
}
</style>
