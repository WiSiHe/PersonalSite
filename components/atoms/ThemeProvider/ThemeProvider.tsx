"use client"

import { useThemeStore } from "@/lib/store"
import { cn } from "@/utils/utility"

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    // const theme = useThemeStore((state) => state.theme) || "light"
    const theme = ""
    return <div className={cn(theme)}>{children}</div>
}

export default ThemeProvider
