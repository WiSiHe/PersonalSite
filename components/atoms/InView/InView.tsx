import { ReactNode, useEffect, useRef, useState } from "react"

interface InViewProps {
    children: ReactNode
    className?: string
}

function InView({ children, className }: InViewProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    console.log("isVisible", isVisible)

    const targetRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const options: IntersectionObserverInit = {
            root: null, // Use the viewport as the root
            rootMargin: "0px", // Margin around the root
            threshold: 0.1, // 50% of the component must be visible
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

        // Create a ref to store the observer
        const observerRef = { current: observer }

        return () => {
            if (current) {
                observerRef.current.unobserve(current)
            }
        }
    }, [])

    return (
        <div ref={targetRef} className={className}>
            {isVisible && children}
        </div>
    )
}

export default InView
