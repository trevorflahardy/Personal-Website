export interface FuryStat {
    v: string;
    l: string;
}

export interface FuryFeature {
    cmd: string;
    title: string;
    body: string;
    why: string;
    img?: string;
}

export interface FuryCredit {
    role: string;
    val: string;
}

const base = import.meta.env.BASE_URL;

export const stats: FuryStat[] = [
    { v: '94', l: 'MEMBERS' },
    { v: '04', l: 'SERVERS' },
    { v: '165', l: 'CHANNELS' },
    { v: '05', l: 'SYSTEMS' },
];

export const features: FuryFeature[] = [
    {
        cmd: '/team manage',
        title: 'TEAM MANAGEMENT',
        body: 'Auto-provisions channels, roles, rosters, subs, captains. Restores deleted channels on its own.',
        why: "Running a school esports club means constant roster churn — students join, leave, and get promoted every semester. Before Fury, every change meant hours of manual Discord admin. Now a single command re-provisions everything a team needs, and if a student accidentally deletes a channel, it's rebuilt in seconds. The bot absorbs the administrative overhead so staff can focus on the game.",
        img: `${base}fury/team_manage.png`,
    },
    {
        cmd: '/scrim create',
        title: 'SCRIM SCHEDULING',
        body: 'Captain schedules; both rosters vote-confirm; Fury spins up a private channel and fires reminders.',
        why: "School scrims kept falling apart — teams would schedule, then half the roster wouldn't show. The vote-confirm flow changes that: if your team commits, you're on record. No-shows can be tracked, captains stay accountable, and the dedicated private channel keeps both teams coordinated without flooding the main server. It turned informal arrangements into binding commitments.",
        img: `${base}fury/scrim_confirm.png`,
    },
    {
        cmd: '/infractions manage',
        title: 'INFRACTION TRACKING',
        body: 'Rides AutoMod. Tally per member, routing config, moderator exemptions, full history dashboard.',
        why: 'K-12 esports clubs have real accountability requirements — school administration needs documented evidence for disciplinary reports. A shared spreadsheet collapses under 90 active students. Fury automatically routes every AutoMod flag, tallies infractions per member, and maintains a timestamped history. Staff can pull a clean report for any student at any time, making every decision defensible.',
        img: `${base}fury/infractions_management.png`,
    },
    {
        cmd: '/attachment-request',
        title: 'ATTACHMENT MODERATION',
        body: 'Every image is classified for NSFW before posting. Approve / approve-silent / deny in one click.',
        why: "One inappropriate image in a K-12 Discord is a serious policy violation with real administrative consequences. Manual post-hoc moderation is reactive — by the time a moderator sees it, students already have. Fury's AI-first classification makes it proactive: every image is screened before it reaches anyone. Staff approval is a single click in a dedicated moderation channel, and the school admin never has to hear about it.",
        img: `${base}fury/attachment_requests.png`,
    },
    {
        cmd: '/practice start',
        title: 'PRACTICE TRACKING',
        body: 'Logs voice join/leave for every team member. Rolls up into team leaderboards automatically.',
        why: 'Coaches deserve real data. Before this feature, starting lineup decisions were made on gut instinct and social dynamics. Now every practice session is logged automatically — who showed up, for how long, across how many weeks. At roster review time, the leaderboard speaks for itself. It also motivates players: they can see exactly where they rank in commitment, not just in skill.',
    },
];

export const credits: FuryCredit[] = [
    { role: 'ENGINE', val: 'Python 3' },
    { role: 'FRAMEWORK', val: 'discord.py' },
    { role: 'STORAGE', val: 'PostgreSQL' },
    { role: 'DRIVER', val: 'asyncpg' },
    { role: 'VISION', val: 'NudeDetector' },
    { role: 'SERVICE', val: 'systemd' },
];

export const originImg = `${base}fury/fury_about.png`;
