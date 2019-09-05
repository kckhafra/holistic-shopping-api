const AuthService = require('../auth/auth-service')

function requireAuth(req, res, next) {
    console.log('requireAuth')
    console.log(req.get('Authorization'))
    next()

  const authToken = req.get('Authorization') || ''

  let basicToken
  if (!authToken.toLowerCase().startsWith('basic ')) {
    return res.status(401).json({ error: 'Missing basic token' })
  } else {
    basicToken = authToken.slice('basic '.length, authToken.length)
  }
  console.log(`before ${basicToken}`)
  const [tokenUserName, tokenPassword] = Buffer(basicToken, 'base64')
     .toString()
     .split(':')
    console.log(`after ${tokenUserName}, ${tokenPassword}`)

  if (!tokenUserName || !tokenPassword) {
    return res.status(401).json({ error: 'Unauthorized request, no password' })
  }

  AuthService.getUserWithUserName(
    req.app.get('db'),
    tokenUserName
  )
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized user request' })
      }

      return AuthService.comparePasswords(tokenPassword, user.password)
        .then(passwordsMatch => {
          if (!passwordsMatch) {
            return res.status(401).json({ error: 'Unauthorized password request' })
          }

          req.user = user
          next()
        })
    })
    .catch(next)
}

module.exports = {
  requireAuth,
}
