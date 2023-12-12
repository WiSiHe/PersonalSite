import { useState } from "react"
import type { Key } from "react-aria-components"
import {
    Breadcrumb,
    Breadcrumbs as AriaBreadCrumbs,
    Link,
} from "react-aria-components"

import { cn } from "@/utils/utility"

interface Breadcrumb {
    id: Key
    label: string
    path: string
}

interface Breadcrumbs {
    items: Breadcrumb[]
    isDisabled?: boolean
}

const BreadCrumbs = ({ items, isDisabled }: Breadcrumbs) => {
    const [breadcrumbs, setBreadcrumbs] = useState(items)

    const navigate = (id: Key) => {
        const i = breadcrumbs.findIndex((item) => item.id === id)
        setBreadcrumbs(breadcrumbs.slice(0, i + 1))
    }

    return (
        <AriaBreadCrumbs
            items={items}
            onAction={navigate}
            className="flex gap-2"
            isDisabled={isDisabled}
        >
            {(item) => {
                const isLast =
                    breadcrumbs[breadcrumbs.length - 1].id === item.id
                return (
                    <Breadcrumb>
                        <Link
                            href={item.path}
                            isDisabled={isLast}
                            className={({
                                isCurrent,
                                isHovered,
                                isPressed,
                                isFocused,
                                isFocusVisible,
                                isDisabled,
                            }) =>
                                cn(
                                    "underline",
                                    isDisabled && "opacity-50",
                                    isHovered && "bg-gray-700",
                                    isCurrent ? "bg-gray-700" : "bg-gray-600",
                                )
                            }
                        >
                            {item.label}
                        </Link>{" "}
                        {!isLast && ">"}
                    </Breadcrumb>
                )
            }}
        </AriaBreadCrumbs>
    )
}

export default BreadCrumbs
