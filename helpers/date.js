const dayjs = require('dayjs')

const isDate = (value) => {
  const date = dayjs(value)
  return date.isValid()
}

module.exports = {
  isDate,
}
