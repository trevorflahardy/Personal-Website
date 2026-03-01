import { ref, watch } from 'vue';

const STORAGE_KEY = 'sidebar-collapsed';
const isCollapsed = ref(localStorage.getItem(STORAGE_KEY) === 'true');

watch(isCollapsed, (val) => {
    localStorage.setItem(STORAGE_KEY, String(val));
});

export function useSidebar() {
    function toggle() {
        isCollapsed.value = !isCollapsed.value;
    }

    function collapse() {
        isCollapsed.value = true;
    }

    function expand() {
        isCollapsed.value = false;
    }

    return { isCollapsed, toggle, collapse, expand };
}
