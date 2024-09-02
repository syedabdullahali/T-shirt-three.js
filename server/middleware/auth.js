const jwt = require("jsonwebtoken");
require("dotenv").config();

const clientAccountMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
      if (token) {
          const { id } = jwt.verify(token, process.env.SECRET_KEY);
          if (id) {
              req.accountId = id;
              next();
          }
      } else {
          res.status(404).json({
              success: false,
              message: "token expired, access denied",
          });
      }
  } catch (err) {
      res.json({ success: false, message: err });
  }

};

const adminAccountMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const { id,role } = jwt.verify(token, process.env.SECRET_KEY);
            if (id) {
                req.accountId = id;
                req.role = role;
                next();
            }
        } else {
            res.status(404).json({
                success: false,
                message: "token expired, access denied",
            });
        }
    } catch (err) {
        res.json({ success: false, message: err });
    }
  
};

const adminAccountRoleCheckMiddleware = (role)=>{
   return function(req, res, next) {
        if (req.role === role) {
          next();
        } else {
          res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
      };  
}

const HandleCheckIsSuperAdmin = (req, res, next)=>{
        const token = req.headers.authorization;
        const { role } = jwt.verify(token, process.env.SECRET_KEY);
        if(role===process.env.ADMIN_KEY){
           return res.status(200).json({superAdimn:true}) 
        }else{
            return res.status(200).json({superAdimn:false}) 
        }
 }

module.exports = {adminAccountMiddleware,clientAccountMiddleware,adminAccountRoleCheckMiddleware,HandleCheckIsSuperAdmin};
