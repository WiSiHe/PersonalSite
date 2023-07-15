import { ThemeProvider as ThemeProviderLib } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <ThemeProviderLib>{children}</ThemeProviderLib>
}

export default ThemeProvider
