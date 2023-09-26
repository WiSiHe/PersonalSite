export const isArray = (arr: any[]) => {
    return Array.isArray(arr)
}

export const maxValueArray = (arr: number[]) => {
    if (!isArray(arr)) return 0
    return Math.max(...arr)
}

export const removeDuplicates = (arr: any[]) => {
    if (!isArray(arr)) return []
    return [...new Set(arr)]
}

export const isEmptyArray = (arr: any[]) => {
    if (!isArray(arr)) return true
    return arr.length === 0
}

export const isNotEmptyArray = (arr: any[]) => {
    if (!isArray(arr)) return false
    return !isEmptyArray(arr)
}

export const convertArrayToString = (arr: any[]) => {
    if (!isArray(arr)) return ""
    return arr.join(", ")
}

export const countOccurrences = (arr: any[], value: any) => {
    if (!isArray(arr)) return 0
    return arr.reduce((a, v) => (v === value ? a + 1 : a), 0)
}

export const sumOfNumbersInArray = (arr: number[]) => {
    if (!isArray(arr)) return 0
    return arr.reduce((a, v) => a + v, 0)
}

export const minimumValueInArray = (arr: number[]) => {
    if (!isArray(arr)) return 0
    return Math.min(...arr)
}

export const getFirstElement = (arr: any[]) => {
    if (!isArray(arr)) return null
    if (isEmptyArray(arr)) return null
    return arr[0]
}
