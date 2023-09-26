/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"

// https://www.youtube.com/watch?v=E0fp2KUWRtQ&ab_channel=aWeekOfExperience
export function useGetFromStore(store: any, callback: any) {
    const result = store(callback)
    const [state, setState] = useState()

    useEffect(() => {
        setState(result)
    }, [result])

    return state
}
