const jwt = require('jsonwebtoken');

const checkUserAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 

        if(!token){
            return res.status(401).json({ error: 'No token provided' });

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        req.user ={id: decoded.id, email: decoded.email}; 

next();
}catch(error) {
        console.error("Error in checkUserAuthenticated:", error);
        return res.status(500).json({ error: 'Server error' });
    }
}
module.exports = checkUserAuthenticated;