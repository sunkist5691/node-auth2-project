const { secretCode } = require('./secret')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
   const token = req.headers.authorization
   if(!token){
      return res.status(401).json({ message: 'Token is not exist'})
      // after return, it ends this function
   }
   jwt.verify(token, secretCode, (err, decodedToken) => {
      // decodedToken 은 token 과 jwtSecret 이 verfity 될때,
      // decoding 을 하는데,
      // decoding 을 하고 나서의 실제 object 모형을 출력한다.
      // 항상 callback 을 받고, 항상 첫번째 arg 인 err 는 err 를 출력
      // 항상 두번째 arg 인 decodedToken 은 decoding 출력

      if(err) return res.status(401).json({ message: 'Not an authorized token'})
      
      req.decodedJWT = decodedToken

      next()
   })
}
