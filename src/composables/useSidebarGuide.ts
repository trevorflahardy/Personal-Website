import { ref, computed, watch } from 'vue';

const GUIDE_KEY = 'sidebar-guide-v1';
const hasSeen = ref(localStorage.getItem(GUIDE_KEY) === 'true');

watch(hasSeen, (val) => {
    localStorage.setItem(GUIDE_KEY, String(val));
});

export function useSidebarGuide() {
    const showGuide = computed(() => !hasSeen.value);

    function dismiss() {
        hasSeen.value = true;
    }

    return { showGuide, dismiss };
}
