import { useLocalStorage } from "@vueuse/core";
import { computed, watchEffect } from "vue";

export function useTheme() {
    const colorMode = useLocalStorage("theme", "light");

    const isDark = computed(() => colorMode.value === "dark");

    const toggleTheme = () => {
        colorMode.value = colorMode.value === "dark" ? "light" : "dark";
    };

    const setTheme = (theme: "light" | "dark") => {
        colorMode.value = theme;
    };

    // Watch for theme changes and update the document class
    watchEffect(() => {
        if (colorMode.value === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    });

    return {
        colorMode,
        isDark,
        toggleTheme,
        setTheme
    };
}