const jwt = require('jsonwebtoken')

const generateJWT = (payload) =>
  new Promise((resolve, reject) => {
    const seed = process.env.SECRET_JWT_SEED
    jwt.sign(
      payload,
      seed,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          reject(err)
        }
        resolve(token)
      }
    )
  })

const decryptJWT = (payload) => jwt.decode(payload)

module.exports = {
  generateJWT,
  decryptJWT,
}
