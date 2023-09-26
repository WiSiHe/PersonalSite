export function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export const isValidNumber = (num: number) => {
    return !isNaN(num)
}

export const isNegative = (num: number) => {
    return num < 0
}

export const isPositive = (num: number) => {
    return num > 0
}

export const isEven = (num: number) => {
    return num % 2 === 0
}

export const isOdd = (num: number) => {
    return num % 2 !== 0
}

export const isInteger = (num: number) => {
    return Number.isInteger(num)
}

export const isFloat = (num: number) => {
    return !Number.isInteger(num)
}

export const isPrime = (num: number) => {
    if (num < 2) return false
    if (num === 2) return true
    if (num % 2 === 0) return false
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false
    }
    return true
}

export const isDivisibleBy = (num: number, divisor: number) => {
    return num % divisor === 0
}

export const isDivisibleByAny = (num: number, divisors: number[]) => {
    return divisors.some((divisor) => isDivisibleBy(num, divisor))
}

export const isDivisibleByAll = (num: number, divisors: number[]) => {
    return divisors.every((divisor) => isDivisibleBy(num, divisor))
}

export const numberFormat = (num: number, locale = "en-US") => {
    return new Intl.NumberFormat(locale).format(num)
}

export const stringToNumber = (str: string) => {
    return Number(str)
}
