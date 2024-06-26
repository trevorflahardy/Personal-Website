<script setup lang="ts">
import { OrbitControls, useFBX } from '@tresjs/cientos';
import { TresCanvas } from '@tresjs/core';
import { Suspense } from 'vue';
import { Vector3 } from 'three';
</script>


<template>
    <TresCanvas clear-color="#82DBC5">
        <TresPerspectiveCamera :position="new Vector3(20, 20, 20)" :look-at="new Vector3(0, 0, 0)" />
        <OrbitControls />

        <Suspense>
        </Suspense>

        <TresAmbientLight :intensity="1" />
    </TresCanvas>
</template>