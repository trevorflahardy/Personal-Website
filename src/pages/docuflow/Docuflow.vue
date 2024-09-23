<script setup lang="ts">
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import Button from "@/components/Button.vue";
import InfoCard from "@/components/InfoCard.vue";

const docuflowInfoCards = [
    {
        title: "Powered by MDX",
        body: "Write all your documentation in MDX, or Markdown + JSX, files and let Docuflow manage the rest. Import between files, use components, and more.",
        icon: "pi-desktop",
    },
    {
        title: "Built on React + Vite",
        body: "Docuflow is built on React and Vite, allowing for extendability and fine-tuned customizations. Define your own React components, and more.",
        icon: "pi-cog",
    },
    {
        title: "Build with a Simple CLI",
        body: "Docuflow comes with a simple CLI for building and deploying your documentation. No need to worry about the build process.",
        icon: "pi-sync",
    }
]
</script>

<template>
    <PageLayoutSpacer>
        <!-- The standard-type intro to the page. -->
        <div class="py-5 px-2 bg-gray-950/30 dark:bg-gray-200/5 shadow-md rounded-[40px] w-full">
            <p class="title text-center w-full">
                Build <span class="text-docuflow-light dark:text-docuflow-dark">quick</span>, lightweight <span
                    class="text-docuflow-light dark:text-docuflow-dark">documentation</span>, don't get bogged down
                by the process.
            </p>

            <div class="flex w-full items-center justify-around mt-5">
                <Button content="Github" icon="pi-github" background="bg-docuflow-light dark:bg-docuflow-dark"
                    class="font-medium" />
            </div>
        </div>

        <!-- Below it denotes some selling points for why docuflow is nifty. These are basically
         info cards without backgrounds. -->
        <div class="flex flex-row flex-wrap items-stretch justify-center gap-5 h-fit">
            <InfoCard imagePosition="top" class="text-center shadow-lg max-w-sm"
                v-for="{ title, body, icon } in docuflowInfoCards" :key="title">
                <template name="image">
                    <i class="pi text-white text-4xl w-full text-center mb-3" :class="icon" />
                </template>

                <h2 class="card-title text-center w-full">
                    {{ title }}
                </h2>

                <p class="card-body max-w-md w-full text-center">
                    {{ body }}
                </p>
            </InfoCard>
        </div>

        <!-- Below it we see some previews of docuflow. This has two images: (1) the documentation
         part of it in the back, and the home page stacked on the front of it. -->
        <div class="w-full h-fit space-y-5 md:px-5 lg:px-10 relative xl:!mb-16">
            <img src="/docuflow-home.png" alt="Docuflow home page preview."
                class="xl:w-[85%] z-10 rounded-xl xl:rounded-[40px]" />
            <img src="/docuflow-docs.png" alt="Docuflow documentation page preview."
                class="xl:absolute xl:w-[65%] z-20 rounded-xl xl:rounded-[40px] xl:-bottom-[15%] xl:right-[5%] xl:shadow-md" />
        </div>

        <!-- Kind of a disclaimer noting that this project is still in early development -->
        <div class="pb-10">
            <p class="text-center text-white">
                Note: Docuflow is still in early development. There are many bugs and missing features that are still
                being developed. This page denotes the planned features for the final project.
            </p>
        </div>

    </PageLayoutSpacer>
</template>