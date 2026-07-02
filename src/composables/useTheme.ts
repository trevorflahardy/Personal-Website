import { computed, watchEffect } from "vue";
import { useLocalStorage } from "@vueuse/core";

// Single source of truth for the theme. Mirrors the no-flash boot script in
// index.html exactly: stored preference wins, otherwise the system setting.
// Keeping the default in sync matters — a hardcoded 'dark' default while the
// boot script honored the system preference used to leave the page in light
// glass over the night background.
const systemPrefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

const theme = useLocalStorage<"dark" | "light">(
    "theme",
    systemPrefersDark ? "dark" : "light",
);

// Keep the <html> class in lockstep with the ref, whoever changes it.
if (typeof document !== "undefined") {
    watchEffect(() => {
        document.documentElement.classList.toggle("dark", theme.value === "dark");
    });
}

export function useTheme() {
    const isDark = computed(() => theme.value === "dark");

    const toggle = () => {
        theme.value = theme.value === "dark" ? "light" : "dark";
    };

    return { theme, isDark, toggle };
}
