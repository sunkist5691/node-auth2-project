const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

const Users = require('../users/users-model')
const { secretCode } = require('./secret')

router.post('/register', (req, res) => {
   // client sending " req.body = { username: '', password: ''} "

   if(isValid(req.body)){
      const rounds = process.env.BCRYPT_ROUNDS || 10

      // hash the password that was created by client
      const hash = bcrypt.hashSync(req.body.password, rounds)

      // change the password with hashed password
      req.body.password = hash

      // save the user req.body to the db
      Users.add(req.body)
         .then(user => {
            res.status(201).json({ data: user })
         })
         .catch(error => {
            res.status(500).json({ message: error.message })
         })
   } else {
      res.status(400).json({
         message: 'Please provide correct username and password'
      })
   }
})

router.post('/login', (req, res) => {
   const { username, password } = req.body

   if(isValid(req.body)){
      // find and match with username in db
      Users.findBy({ username: username })
         .then(([user]) => {
            // compare the password from client and the hashed password in db
            if(user && bcrypt.compareSync(password, user.password)){
               // user.password is a hashed password from db matched with certain username
   
               // create Token using a user info
               const token = createToken(user)

               // send welcome message with a token that was just created.
               res.status(200).json({ message: "Welcome my friend!", token })
            } else {
               res.status(401).json({ message: 'Invalid credentials' })
            }
         })
         .catch(error => {
            res.status(500).json({ message: error.message })
         })
   } else {
      res.status(400).json({
         message: "Please provide username and password"
      })
   }
})

function isValid(user) {
   return Boolean(user.username && user.password && typeof user.password === "string");
}

function createToken(user){
   const payload = {
      subject: user.id,
      username: user.username,
      role: user.role
   }

   const options = {
      expiresIn: '60 seconds'
   }

   return jwt.sign(payload, secretCode, options)
}

module.exports = router