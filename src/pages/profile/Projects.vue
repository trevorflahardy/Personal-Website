<script setup lang="ts">
import { routerLinkName as chaiRouterName, icon as chaiProfilePic } from "@/pages/chai/info";
import { textGradient as docuflowTextGradient, routerLinkName as docuflowRouterName } from "../docuflow/info";
import InfoCard from "@/components/InfoCard.vue";
import Button from "@/components/Button.vue";
</script>

<template>
    <div class="w-full">
        <h2 class="title-2 text-left mb-6 lg:mb-8">
            Some of my Projects
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <!-- Tixte card -->
            <InfoCard class="w-full" image-position="top" background="bg-white/4">
                <template #image>
                    <img src="/tixte.png" alt="Tixte.py logo" class="rounded-t-xl w-full object-cover" />
                </template>

                <h2 class="card-title">Tixte Python Wrapper</h2>
                <p class="card-body">
                    <span class="font-medium text-white/90">tixte.py</span> is an asynchronous Python library
                    for the Tixte API. It allows developers to easily create and manage files on the Tixte platform.
                </p>

                <template #buttons>
                    <Button content="Github" icon="pi-github"
                        background="bg-yellow-200/90 hover:bg-yellow-200"
                        text-extra="text-sky-900"
                        link="https://github.com/trevorflahardy/tixte.py" />
                </template>
            </InfoCard>

            <!-- Docuflow card -->
            <InfoCard class="w-full" image-position="top" background="bg-white/4">
                <template #image>
                    <div class="bg-white/90 px-6 py-4 rounded-t-xl flex items-center justify-center">
                        <img :src="docuflowTextGradient" alt="Docuflow text gradient logo banner" class="max-h-12" />
                    </div>
                </template>

                <h2 class="card-title">Docuflow</h2>
                <p class="card-body">
                    A simple documentation generator from MDX, Markdown + JSX, files. Built for people who want
                    to focus on what's important, their work.
                </p>

                <template #buttons>
                    <router-link :to="{ name: docuflowRouterName }">
                        <Button content="See More"
                            background="bg-docuflow-light/90 hover:bg-docuflow-light dark:bg-docuflow-dark/90 dark:hover:bg-docuflow-dark"
                            text-extra="text-white" />
                    </router-link>
                </template>
            </InfoCard>

            <!-- Chai card -->
            <InfoCard class="w-full" background="bg-white/4">
                <div class="flex items-center gap-3 mb-2 w-full">
                    <img :src="chaiProfilePic" alt="Chai PFP icon" class="rounded-full w-8 h-8" />
                    <h2 class="card-title mb-0">Chai</h2>
                </div>

                <p class="card-body">
                    A highly advanced Discord bot centered around Epic Games' popular game, Fortnite. Although I've
                    been working on Chai for many years, I'm always looking for ways to improve it.
                </p>

                <template #buttons>
                    <router-link :to="{ name: chaiRouterName }">
                        <Button content="See More"
                            background="bg-chai-400/90 hover:bg-chai-400"
                            text-extra="text-white font-medium" />
                    </router-link>
                    <Button content="Dev Board" icon="pi-book"
                        background="bg-white/6 hover:bg-white/10 border border-chai-400/40"
                        text-extra="text-chai-200"
                        link="https://github.com/users/trevorflahardy/projects/11" />
                </template>
            </InfoCard>

            <!-- Image Merger card -->
            <InfoCard image-position="top" class="w-full" background="bg-white/4">
                <template #image>
                    <img src="/image-merger-banner.png" alt="Image merger banner" class="rounded-t-xl w-full object-cover" />
                </template>

                <h2 class="card-title">Image Merger</h2>
                <p class="card-body">
                    A Rust crate that provides blazing-fast functionality for merging many images.
                    Built on top of the image crate with multi-threading and careful memory management.
                </p>

                <template #buttons>
                    <Button content="Github" icon="pi-github"
                        background="bg-orange-500/90 hover:bg-orange-500"
                        text-extra="text-white"
                        link="https://github.com/trevorflahardy/image-merger" />
                    <Button content="Crates.io" icon="pi-book"
                        background="bg-white/6 hover:bg-white/10 border border-orange-500/40"
                        text-extra="text-orange-400"
                        link="https://crates.io/crates/image-merger" />
                </template>
            </InfoCard>
        </div>
    </div>
</template>
