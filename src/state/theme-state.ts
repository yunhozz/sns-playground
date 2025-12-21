import type { Theme } from "@/types.ts";
import { combine, devtools, persist } from "zustand/middleware";
import { create } from "zustand/react";

type TState = {
    theme: Theme
}

const initialState: TState = {
    theme: "light"
};

const useThemeState = create(
    devtools(
        persist( // 로컬 스토리지에 테마 저장
            combine(initialState, (setState, getState, store) => ({
                actions: {
                    setTheme: (theme: Theme) => {
                        const htmlTag = document.documentElement;
                        htmlTag.classList.remove("dark", "light");

                        if (theme === "system") {
                            const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
                            htmlTag.classList.add(isDarkTheme ? "dark" : "light");
                        } else {
                            htmlTag.classList.add(theme);
                        }

                        setState({ theme });
                    }
                }
            })),
            {
                name: "ThemeState",
                partialize: (state) => ({
                    theme: state.theme
                })
            }
        ),
        {
            name: "ThemeState"
        }
    )
);

export const useTheme = () => useThemeState(state => state.theme);

export const useSetTheme = () => useThemeState(state => state.actions.setTheme);