export const isValidObject = (obj: any) => {
    return obj && typeof obj === "object"
}

export const isEmptyObject = (obj: any) => {
    if (!isValidObject(obj)) {
        return false
    }
    return Object.keys(obj).length === 0
}

export const isNotEmptyObject = (obj: any) => {
    if (!isValidObject(obj)) {
        return false
    }
    return !isEmptyObject(obj)
}

export const convertObjectToString = (obj: any) => {
    if (!isValidObject(obj)) {
        return ""
    }
    return JSON.stringify(obj)
}

export const convertObjectToArray = (obj: any) => {
    if (!isValidObject(obj)) {
        return []
    }
    return Object.values(obj)
}

export const getFirstElement = (obj: any) => {
    if (!isValidObject(obj)) {
        return null
    }
    return Object.values(obj)[0]
}
