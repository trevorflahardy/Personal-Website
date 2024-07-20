<script setup lang="ts">
import { routerLinkName as chaiRouterName, profilePic as chaiProfilePic } from "@/pages/chai/info";
import InfoCard from "@/components/InfoCard.vue";
import Button from "@/components/Button.vue";
</script>

<template>
    <!-- This component holds the sliding project cards on the profile page. This links
     users to specific projects or lets them click on the project to view a more in-depth 
     page on it.-->
    <div class="px-5 w-full">
        <h2 class="title-2 text-left">
            My Meaningful Projects
        </h2>

        <div class="flex flex-row gap-5 overflow-x-scroll flex-nowrap">
            <!-- Holds the Chai project card -->
            <InfoCard class="max-w-sm">
                <!--Title followed by a chai pfp on the other side-->
                <div class="flex flex-row justify-between mr-1">
                    <h1 class="card-title">
                        Chai
                    </h1>
                    <img :src="chaiProfilePic" class="rounded-full size-7" />
                </div>

                <p class="card-body mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque fugit non laudantium tenetur
                    impedit,
                    ea officia delectus sapiente a cupiditate doloremque facere totam modi mollitia aliquid quaerat
                    obcaecati? Fuga, quam.
                </p>

                <!-- Shows the action buttons on this card -->
                <div class="flex flex-row items-center justify-start gap-2">
                    <router-link :to="{ name: chaiRouterName }">
                        <Button content="Project" background="bg-chai" class="max-w-32 font-medium" />
                    </router-link>

                    <Button content="Development Board" background="bg-inherit" class="outline outline-1 outline-chai"
                        link="https://github.com/users/trevorflahardy/projects/11" icon="pi-book" />
                </div>


            </InfoCard>
        </div>
    </div>
</template>