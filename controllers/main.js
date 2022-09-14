// check username,password in post(login) request
// If it exists create new JWT
// send back to Front-end

// set up authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const {BadRequest} = require('../errors')

const login = async (req, res) => {
    const {username,password} = req.body
    // mongoose
    //joi disable
    // check in the controller

    if(!username || !password){
        throw new BadRequest('Please provide email and password')
    }

    //just for demo,normally provided by database
    const id = new Date().getDate()

    // try to keep payload small
    // just for demo, in production use long and unpredictable string
    const token = jwt.sign({id,username},process.env.PASS,{expiresIn:`30d`})
    res.status(200).json({msg:`user created`,token})
}

const dashboard = async(req,res) => {
    
        const luckyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({
            msg: `Hello ${req.user.username}`,
            secret: `Here is your authorized data,your luckyNumber is ${luckyNumber}`,
          })
    
}

module.exports = {
    login,dashboard
}