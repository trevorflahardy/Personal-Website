import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    // The main page of the app. Shows my profile.
    { path: "/", name: 'profile', component: () => import('@/pages/profile/HeroProfile.vue') },
    // NOTE: Maybe make these dynamic in the future?
    { path: "/p/chai", name: 'project-chai', component: () => import('@/pages/chai/Chai.vue') },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFound.vue') },
]

export const router = createRouter({
    history: createWebHistory('Personal-Website'),
    routes
});