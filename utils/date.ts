export const getCurrentDate = () => {
    return new Date()
}

export const getCurrentDay = () => {
    return new Intl.DateTimeFormat("en-us", { day: "2-digit" }).format(
        getCurrentDate(),
    )
}
export const getDay = (date: Date) => {
    return new Intl.DateTimeFormat("en-us", { day: "2-digit" }).format(date)
}

export const getCurrentMonth = () => {
    return new Intl.DateTimeFormat("en-us", { month: "short" }).format(
        getCurrentDate(),
    )
}

export const getMonth = (date: Date) => {
    return new Intl.DateTimeFormat("en-us", { month: "short" }).format(date)
}

export const getCurrentYear = () => {
    return new Intl.DateTimeFormat("en-us", { year: "numeric" }).format(
        getCurrentDate(),
    )
}

export const getYear = (date: Date) => {
    return new Intl.DateTimeFormat("en-us", { year: "numeric" }).format(date)
}

export const getCurrentHour = () => {
    return new Intl.DateTimeFormat("en-us", { hour: "numeric" }).format(
        getCurrentDate(),
    )
}

export const getHour = (date: Date) => {
    return new Intl.DateTimeFormat("en-us", { hour: "numeric" }).format(date)
}

export const getCurrentMinute = () => {
    return new Intl.DateTimeFormat("en-us", { minute: "numeric" }).format(
        getCurrentDate(),
    )
}

export const getMinute = (date: Date) => {
    return new Intl.DateTimeFormat("en-us", { minute: "numeric" }).format(date)
}

export const getCurrentSecond = () => {
    return new Intl.DateTimeFormat("en-us", { second: "numeric" }).format(
        getCurrentDate(),
    )
}

export const getSecond = (date: Date) => {
    return new Intl.DateTimeFormat("en-us", { second: "numeric" }).format(date)
}

export const getCurrentTime = () => {
    return new Intl.DateTimeFormat("en-us", {
        hour: "numeric",
        minute: "numeric",
    }).format(getCurrentDate())
}

export const getTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-us", {
        hour: "numeric",
        minute: "numeric",
    }).format(date)
}

export const getCurrentDateTime = () => {
    return new Intl.DateTimeFormat("en-us", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
    }).format(getCurrentDate())
}

export const getDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-us", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
    }).format(date)
}
