const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
exports.isAuth = (req, res, next) => {
    
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; 
            next();
            
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token!' });
        }
    }else{
        return res.status(401).json({ message: 'No Token!' });
    }

}

