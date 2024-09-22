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
        <h2 class="title-2 text-left mb-5">
            Some of my Projects
        </h2>

        <div class="flex items-center justify-center">
            <div
                class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 grid-rows-auto gap-5 items-start justify-between place-items-baseline">
                <InfoCard class="max-w-sm min-w-64" image-position="top">
                    <template #image>
                        <img src="/tixte.png" alt="Tixte.py logo" class="rounded-xl" />
                    </template>

                    <!--NOTE: Placed in DIV here so that the shorter card does not have weird formatting/-->
                    <h2 class="card-title">
                        Tixte Python Wrapper
                    </h2>

                    <p class="card-body">
                        <strong>tixte.py</strong> is an asynchronous Python library for the Tixte API. It allows
                        developers
                        to easily
                        create and
                        manage files on the Tixte platform.
                    </p>

                    <template #buttons>
                        <Button content="Github" background="bg-yellow-200" class="max-w-32"
                            icon="pi-github" text-extra="text-sky-900"
                            link="https://github.com/trevorflahardy/tixte.py" />
                    </template>
                </InfoCard>

                <!-- The docuflow card -->
                <InfoCard class="max-w-sm min-w-64" image-position="top">
                    <template #image>
                        <img :src="docuflowTextGradient" alt="Docuflow text gradient logo banner"
                            class="bg-white px-5 py-3 rounded-xl">
                    </template>

                    <h2 class="card-title">
                        Docuflow
                    </h2>

                    <p class="card-body">
                        A simple documentation generator from MDX, Markdown + JSX, files. Built for people who want
                        to focus on what's important, their work.
                    </p>

                    <!-- Shows the action buttons on this card -->
                    <template #buttons>
                        <router-link :to="{ name: docuflowRouterName }">
                            <Button content="See More" background="bg-docuflow-light dark:bg-docuflow-dark"
                                text-color="text-white" class="max-w-32" />
                        </router-link>
                    </template>
                </InfoCard>

                <InfoCard class="max-w-sm min-w-64" image-position="left">
                    <!--Title followed by a chai pfp on the other side-->
                    <div class="flex flex-row justify-between mr-1 mb-1 w-full">
                        <h2 class="card-title">
                            Chai
                        </h2>
                        <img :src="chaiProfilePic" alt="Chai PFP icon" class="rounded-full size-5 md:size-7" />
                    </div>

                    <p class="card-body">
                        A highly advanced Discord bot centered around Epic Games' popular game, Fortnite. Although I've
                        been
                        working on Chai
                        for many years,
                        I'm always looking for ways to improve it.
                    </p>

                    <!-- Shows the action buttons on this card -->
                    <template #buttons>
                        <router-link :to="{ name: chaiRouterName }">
                            <Button content="See More" background="bg-chai-400" class="max-w-32 font-medium" />
                        </router-link>

                        <Button content="Development Board" background="bg-inherit"
                            class="outline outline-1 outline-chai-400"
                            link="https://github.com/users/trevorflahardy/projects/11" icon="pi-book" />
                    </template>
                </InfoCard>

                <InfoCard image-position="top" class="max-w-sm min-w-64">
                    <template #image>
                        <img src="/image-merger-banner.png" alt="Image merger banner" class="rounded-xl" />
                    </template>

                    <h2 class="card-title">
                        Image Merger
                    </h2>

                    <p class="card-body">
                        Image Merger is a Rust crate that provides blazing-fast functionality for "merging" many images.
                        It's built on top of the image crate and designed to take advantage
                        of multi-threading and close attention to memory management.
                    </p>

                    <template #buttons>
                        <Button content="Github" background="bg-orange-500" class="max-w-32" icon="pi-github"
                            text-extra="text-white" link="https://github.com/trevorflahardy/image-merger" />

                        <Button content="Crates.io" background="bg-none"
                            class="max-w-32 outline outline-1 outline-orange-500" icon="pi-book"
                            text-extra="text-orange-400 dark:text-orange-500"
                            link="https://crates.io/crates/image-merger" />
                    </template>
                </InfoCard>
            </div>
        </div>
    </div>
</template>