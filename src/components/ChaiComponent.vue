<script setup>
import DiscordIcon from "@/assets/DiscordIcon.vue";

const chaiUrl =
    "https://discord.com/oauth2/authorize?client_id=728115804826239017&scope=bot&permissions=422964311";
</script>

<template>
    <div class="p-5 space-y-5">
        <!--Description of Chai -->
        <div class="glass-thick flex flex-col items-center justify-center p-5 rounded-xl snap-center">
            <span class="text-white font-semibold text-xl"> Chai </span>
            <span class="text-gray-300 text-md max-w-[70%] text-center">
                A description of what Chai is. This is a very long description that
                should take up multiple lines.
            </span>
            <!-- Holds some buttons for actions -->
            <div class="flex flex-row items-center justify-center mt-3">
                <a :href="chaiUrl" target="_blank" class="text-white font-semibold">
                    <button class="button-glass">
                        <DiscordIcon class="w-5 h-5 fill-white" />
                        <span> Try on Discord </span>
                    </button>
                </a>
            </div>
        </div>

        <!-- Holds cards about the box -->
        <div class="flex flex-row items-stretch justify-center gap-5 snap-center">
            <div class="basis-1/3 shadow-xl rounded-xl px-3 py-7 bg-gradient-to-br from-yellow-500 from-40 to-red-600 h-full">
                <!-- TODO: Maybe refac this verbiage -->
                <span class="text-white text-4xl font-semibold">
                    Built in Python, expanded in Rust.
                </span>
            </div>
        
            <!-- Holds some cards that contain some jargon about what Chai is-->
            <div class="basis-2/3 glass-thick shadow rounded-xl flex flex-row items-center justify-center overflow-hidden">
                <div class="basis-2/5 h-full">
                    <!--Image here or something, but for now placeholder-->
                    <div class="h-full bg-gradient-to-br from-blue-500 to-indigo-800 shadow-xl"></div>
                </div>

                <div class="basis-3/5 p-4 space-y-3">
                    <div>
                        <div>
                            <span class="text-white text-xl font-semibold">
                            Some Sort of Title
                        </span>
                        </div>

                        <div>
                            <span class="text-gray-300 text-md">
                            Some sort of descripiton here that can take up multiple lines.
                        </span>
                        </div>
                    </div>

                    <!--Maybe a button here that does something? -->
                    <div class="button-glass shadow-xl w-fit">
                        <span class="text-white font-semibold">An Action of Sorts</span>
                    </div>
                </div>
            </div>

        </div>

        <!-- Holds a preview of what Chai does (maybe macbook preview of it being used on Discord with some text next to it??)-->
        <div class="snap-center p-5 flex flex-row justify-center items-center max-h-">
            <div class="basis-2/5 text-center">
                <span class="text-white text-4xl font-semibold">
                    Engineered to be easy.
                </span> 
            </div>

            <!-- An image or something that shows a preview (might photoshop?) -->
            <div class="w-full h-96 rounded-xl bg-gradient-to-br from-gray-300 to-gray-600 shadow"/>
        </div>

    </div>
</template>
