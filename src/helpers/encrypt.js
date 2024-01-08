const bcrypt = require('bcrypt')

const encrypt = (text) => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(text, salt)
}

const decrypt = (text, textEncrypted) => {
  return bcrypt.compareSync(text, textEncrypted)
}

module.exports = {
  encrypt,
  decrypt,
}
