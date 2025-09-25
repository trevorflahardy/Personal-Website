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

    // Initialize theme on first load
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        console.log("Theme debug:", { savedTheme, prefersDark, currentMode: colorMode.value });

        if (!savedTheme) {
            colorMode.value = prefersDark ? "dark" : "light";
        }

        // Apply the class immediately
        if (colorMode.value === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        console.log("Theme initialized:", colorMode.value, "Dark class present:", document.documentElement.classList.contains('dark'));
    };

    // Watch for theme changes and update the document class
    watchEffect(() => {
        if (colorMode.value === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    });

    // Initialize theme when composable is first used
    initializeTheme();

    return {
        colorMode,
        isDark,
        toggleTheme,
        setTheme,
        initializeTheme
    };
}