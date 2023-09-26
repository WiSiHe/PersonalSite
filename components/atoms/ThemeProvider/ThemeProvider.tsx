interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return <div>{children}</div>
}

export default ThemeProvider
