import { Switch as AriaSwitch, type SwitchProps } from "react-aria-components"

type MySwitchProps = Omit<SwitchProps, "children"> & {
    children: React.ReactNode
}

function Switch({ children, ...props }: MySwitchProps) {
    return (
        <AriaSwitch
            {...props}
            className="flex items-center gap-2 text-lg font-semibold text-black group"
        >
            <div className="w-12 h-12 bg-primary" />

            {children}
        </AriaSwitch>
    )
}

export default Switch
