const jwt = require('jsonwebtoken')
const {Unauthenticated} = require('../errors')

const authenticationMiddleware = (req, res, next) => {
  
    const authHeader = req.headers.authorization;
  
    if(!authHeader || !authHeader.startsWith('Bearer ')){
  
        throw new Unauthenticated('No token provided')
    }
    const token = authHeader.split(' ')[1];
    
    try{
    
        const decoded = jwt.verify(token,process.env.PASS);
        const {id,username} = decoded;
        req.user = {id,username}
        
        next();
    }catch(error){
    
        throw new Unauthenticated('Not authorized to access this route')
    }
    

  
}

module.exports = authenticationMiddleware