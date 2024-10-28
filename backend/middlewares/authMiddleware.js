const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isLoggedIn = async(req, res, next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
        
    }
    const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decode?.id._id);
        req.user = user;
        next();
    } catch(error){

        if(error.name==='TokenExpiredError'){
            const refreshToken = req.cookies.refreshToken; // Get refresh token from cookie

            if (!refreshToken) {
              return res.status(401).json({ message: 'No refresh token provided' });
            }
            jwt.verify(refreshToken, process.env.refresh_KEY, (refreshErr, refreshDecoded) => {
              if (refreshErr) {
                return res.status(403).json({ message: 'Invalid refresh token' });
              }
    
              const newAccessToken = jwt.sign(
                { refreshDecoded},
                process.env.refresh_KEY,
                { expiresIn: '15m' }
              );
    
              res.set('Authorization', `Bearer ${newAccessToken}`);
              req.user = refreshDecoded;
              
              next();
            })
        }
        else{
            return res.status(401).json({ message: 'Token Expired' });
        }
    } 
}

const isAdmin = async(req,res, next)=>{
    if(req.user?.role==="admin"){
        next();
    }
    else{
        throw new Error('your not admin');
    }
} 

module.exports = {isLoggedIn, isAdmin};