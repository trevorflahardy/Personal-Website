<script setup>

const devconLanguages = [
    "c",
    "cplusplus",
    "csharp",
    "css3",
    "django",
    "docker",
    "fastapi",
    "figma",
    "git",
    "html5",
    "java",
    "javascript",
    "latex",
    "mysql",
    "postgresql",
    "python",
    "redis",
    "readthedocs",
    "rust",
    "ruby",
    "vscode",
]

const goals = [
    {
        title: "Short Term",
        description: "This is a plceholder description that is at least a couple lines wide."
    },
    {
        title: "Long Term",
        description: "This is a second placeholder description that spans at least one line if not more."
    }
]
</script>


<template>
    <div class="p-5">
        <div class="snap-center">
            <!-- Holds the about me, so includes - mission statement, languages, etc. -->
            <div class="px-5 py-4 flex flex-col items-center justify-center gap-5">
                <div>
                    <div class="place-self-start">
                        <span class="text-white font-semibold">
                            About Me
                        </span>
                    </div>
                    <div class="w-full flex flex-row items-center justify-center gap-5">
                        <div v-for="goal in goals" class="glass-thick shadow-2xl basis-1/2 rounded-xl p-4 [transform: translateZ(30px)] hover:scale-[1.01] duration-500 ease-in-out">
                            <div class="font-semibold text-white [transform: translateZ(20px)] text-left">
                                {{ goal.title }}
                            </div>
                            <div class="text-gray-300 text-left text-sm">
                                {{ goal.description }}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="place-self-start">
                        <span class="text-white font-semibold">
                            Technologies I Use
                        </span>
                    </div>
                    <div class="w-full basis-1/2 glass-thick rounded-xl text-center p-5 flex flex-row flex-wrap items-center justify-center gap-2 hover:scale-[1.01] translation duration-500 ease-out">
                        <div v-for="language in devconLanguages" class="flex flex-col items-center justify-center hover:scale-110 translation duration-200 ease-in-out rounded-md glass-thick p-2 shadow-xl text-2xl [transform: translateZ(30px)]">
                            <i :class="'devicon-' + language + '-plain'" class="text-white"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
