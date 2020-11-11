const router = require('express').Router()

const Users = require('./users-model')
const restrictedToken = require('../auth/restricted-middleware')

router.get('/', restrictedToken, (req, res) => {
   Users.find()
      .then(users => {
         res.status(200).json(users)
      })
      .catch(error => res.send(error))
})

module.exports = router