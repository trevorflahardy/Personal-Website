import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    // The main page of the app. Shows my profile.
    { path: "/", component: () => import('@/pages/profile/HeroProfile.vue'), name: 'profile' },
    // NOTE: Maybe make these dynamic in the future?
    { path: "/p/chai", component: () => import('@/pages/chai/Chai.vue'), name: 'project-chai' },
]

export const router = createRouter({
    history: createWebHistory('Personal-Website'),
    routes
});