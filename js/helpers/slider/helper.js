export const updateIndex = (index, arr, shouldIncrement) =>
  (index = shouldIncrement
    ? index >= arr.length - 1
      ? 0
      : index + 1
    : index <= 0
    ? arr.length - 1
    : index - 1)
