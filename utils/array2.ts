function removeDuplicates(array: any[]) {
  return [...new Set(array)]
}

function isEmptyArray(array: any[]) {
  return array.length === 0
}

function isNotEmptyArray(array: any[]) {
  return !isEmptyArray(array)
}

function convertArrayToString(array: any[]) {
  return array.join(", ")
}

function countOccurrences(array: any[], value: any) {
  return array.reduce((a, v) => (v === value ? a + 1 : a), 0)
}

function sumOfNumbersInArray(array: number[]) {
  return array.reduce((a, v) => a + v, 0)
}

export {
  convertArrayToString,
  countOccurrences,
  isEmptyArray,
  isNotEmptyArray,
  removeDuplicates,
  sumOfNumbersInArray,
}
