<script setup lang="ts">
import { routerLinkName as chaiRouterName, icon as chaiProfilePic } from "@/pages/chai/info";
import { textGradient as docuflowTextGradient, routerLinkName as docuflowRouterName } from "../docuflow/info";
import InfoCard from "@/components/InfoCard.vue";
import Button from "@/components/Button.vue";
</script>

<template>
    <!-- This component holds the sliding project cards on the profile page. This links
     users to specific projects or lets them click on the project to view a more in-depth 
     page on it.-->
    <div class="px-5 w-full">
        <h2 class="title-2 text-center mb-5">
            Some Meaningful Projects
        </h2>

        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 grid-rows-auto gap-5 items-start justify-center place-items-center">
            <!-- Holds the Chai project card -->
            <InfoCard class="max-w-sm flex justify-between" image-position="top">
                <template #image>
                    <!-- We do not have an image for Chai right now, so we'll just do a banner
                     that is the chai background color. -->
                    <div class="w-full h-full min-h-12 md:min-h-20 bg-chai-400 rounded-t-xl"></div>
                </template>

                <!--Title followed by a chai pfp on the other side-->
                <div class="flex flex-row justify-between mr-1">
                    <h1 class="card-title">
                        Chai
                    </h1>
                    <img :src="chaiProfilePic" class="rounded-full size-7" />
                </div>

                <p class="card-body mb-5">
                    A highly advanced Discord bot centered around Epic Games' popular game, Fortnite. Chai is a labor of
                    love for me,
                    and although I've been working on it for years,
                    I'm always looking for ways to improve it.
                </p>

                <!-- Shows the action buttons on this card -->
                <div class="flex flex-row flex-wrap items-center justify-start gap-3">
                    <router-link :to="{ name: chaiRouterName }">
                        <Button content="See More" background="bg-chai-400" class="max-w-32 font-medium" />
                    </router-link>

                    <Button content="Development Board" background="bg-inherit"
                        class="outline outline-1 outline-chai-400"
                        link="https://github.com/users/trevorflahardy/projects/11" icon="pi-book" />
                </div>
            </InfoCard>

            <InfoCard class="max-w-sm" image-position="top">
                <template #image>
                    <img src="/tixte.png" class="rounded-xl" />
                </template>

                <!-- Shows the title, description, and lin to the project -->
                <h1 class="card-title">
                    Tixte Python Wrapper
                </h1>

                <p class="card-body mb-5">
                    <strong>tixte.py</strong> is a Python wrapper for the Tixte API. It allows developers to easily
                    create and
                    manage files on the Tixte platform.
                </p>

                <!-- The tixte button that shows the user the github-->
                <Button content="Github" background="bg-yellow-200" class="max-w-32 font-medium" icon="pi-github"
                    text-color="text-sky-900" link="https://github.com/trevorflahardy/tixte.py" />
            </InfoCard>

            <!-- The docuflow card -->
            <InfoCard class="max-w-sm min-w-64" image-position="top">
                <template #image>
                    <img :src="docuflowTextGradient" class="bg-white p-5">
                </template>

                <h1 class="card-title">
                    Docuflow
                </h1>

                <p class="card-body mb-5">
                    A simple documentation generator from MDX, Markdown + JSX, files. Built for people who want
                    to focus on what's important, their work.
                </p>

                <!-- Shows the action buttons on this card -->
                <router-link :to="{ name: docuflowRouterName }">
                    <Button content="See More" background="bg-docuflow-light dark:bg-docuflow-dark"
                        text-color="text-white" class="max-w-32" />
                </router-link>

            </InfoCard>
        </div>
    </div>
</template>