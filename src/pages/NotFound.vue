<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<template>
    <div class="p-5">
        <h1 class="title">Hold on there, chief!</h1>
        <p class="subtitle">
            You seem to have found a page that doesn't exist! Don't worry, it happens to the best of us. Click on the
            button below to go back to safety. If you think this is a mistake, it works on my machine so it's probably
            your fault.
        </p>

        <router-link :to="{ name: 'profile' }">
            <Button content="Take me back to safety" icon="pi-home" />
        </router-link>
    </div>
</template>