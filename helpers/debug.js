const log = (e) => {
  console.log('Error', e.stack)
  console.log('Error', e.name)
  console.log('Error', e.message)
}

module.exports = log
