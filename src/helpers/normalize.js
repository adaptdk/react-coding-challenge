export const integersOnly = (value, previousValue) => {
  if (!value) {
    return value
  }
  return value.replace(/[^\d]/g, '')
}