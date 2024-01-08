const jwt = require('jsonwebtoken')

const generateJWT = (payload) => {
  const seed = process.env.SECRET_JWT_SEED

  const token = jwt.sign(payload, seed, {
    expiresIn: '2h',
  })

  return token
}

const decryptJWT = (payload) => jwt.decode(payload)

const verifyJWT = (token) =>
  new Promise((resolve, reject) => {
    const seed = process.env.SECRET_JWT_SEED
    jwt.verify(token, seed, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded)
    })
  })

module.exports = {
  generateJWT,
  decryptJWT,
  verifyJWT,
}
