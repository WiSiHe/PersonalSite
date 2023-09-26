import { ReactNode, useEffect, useRef, useState } from "react"

interface InViewProps {
    children: ReactNode
}

function InView({ children }: InViewProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const targetRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const options: IntersectionObserverInit = {
            root: null, // Use the viewport as the root
            rootMargin: "0px", // Margin around the root
            threshold: 0.5, // 50% of the component must be visible
        }
        const { current } = targetRef

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (current) {
                        observer.unobserve(current)
                    }
                }
            })
        }, options)

        if (current) {
            observer.observe(current)
        }

        return () => {
            if (current) {
                observer.unobserve(current)
            }
        }
    }, [])

    return <div ref={targetRef}>{isVisible && children}</div>
}

export default InView
