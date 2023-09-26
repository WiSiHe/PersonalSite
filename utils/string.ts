export const isString = (str: string) => {
    return typeof str === "string"
}

export const isStringValid = (str: string) => {
    return !isNaN(parseFloat(str))
}

export const isPalindrome = (str: string) => {
    return str === str.split("").reverse().join("")
}

export const isAnagram = (str1: string, str2: string) => {
    return str1.split("").sort().join("") === str2.split("").sort().join("")
}

export const isPangram = (str: string) => {
    return new Set(str.toLowerCase().match(/[a-z]/g)).size === 26
}

export const isStringEmpty = (str: string) => {
    return str === ""
}

export const isStringNotEmpty = (str: string) => {
    return !isStringEmpty(str)
}

export const convertStringToArray = (str: string) => {
    return str.split("")
}

export const convertStringToLowerCase = (str: string) => {
    return str.toLowerCase()
}

export const convertStringToUpperCase = (str: string) => {
    return str.toUpperCase()
}

export const convertStringToCamelCase = (str: string) => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, "")
}

export const convertStringToKebabCase = (str: string) => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase()
}

export const convertStringToSnakeCase = (str: string) => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1_$2").toLowerCase()
}

export const convertStringToTitleCase = (str: string) => {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    )
}

export const slugify = (str: string) => {
    if (!str) return ""
    return str
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-")
}

// export const listFormat = (list: string[]) => {
//   return new Intl.ListFormat("en-US", {
//     style: "long",
//     type: "conjunction",
//   }).format(list)
// }

export function stripTrailingSlash(input: string): string {
    return input.replace(/\/$/, "")
}
