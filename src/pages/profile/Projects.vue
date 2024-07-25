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

        <div class="flex flex-row flex-wrap gap-5 items-start">
            <!-- Holds the Chai project card -->
            <InfoCard class="max-w-sm flex justify-between">
                <!--Title followed by a chai pfp on the other side-->
                <div class="flex flex-row justify-between mr-1">
                    <h1 class="card-title">
                        Chai
                    </h1>
                    <img :src="chaiProfilePic" class="rounded-full size-7" />
                </div>

                <p class="card-body mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque fugit non laudantium tenetur
                    impedit,
                    ea officia delectus sapiente a cupiditate doloremque facere totam modi mollitia aliquid quaerat
                    obcaecati? Fuga, quam.
                </p>

                <!-- Shows the action buttons on this card -->
                <div class="flex flex-row items-center justify-start gap-2">
                    <router-link :to="{ name: chaiRouterName }">
                        <Button content="Project" background="bg-chai-400" class="max-w-32 font-medium" />
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt eius accusamus ipsum fugiat vero
                    assumenda adipisci
                    reiciendis corporis fuga. Nostrum optio minus laborum error maiores ullam nesciunt porro ea
                    sapiente.
                </p>

                <!-- The tixte button that shows the user the github-->
                <Button content="Github" background="bg-yellow-200" class="max-w-32 font-medium" icon="pi-github"
                    text-color="text-sky-900" link="https://github.com/trevorflahardy/tixte.py" />
            </InfoCard>
        </div>
    </div>
</template>