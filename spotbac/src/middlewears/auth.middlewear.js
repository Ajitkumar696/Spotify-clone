const jwt=require('jsonwebtoken');
async function authArtist(req,res,next){
    const token=req.cookies.token;
        if(!token){
            res.status(401).json({
                message:"unathorised"
            })
        }
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
         if(decoded.role!="artist"){
            return res.status(403).json({
                message:"you don't have access to creat album"
            })
    
         }
         req.user= decoded;
         next()
        }
         catch(err){
        console.log(err);
        return res.status(401).json({
            message:"unathorised"
        })
    }

}
function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }
}
async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "unauthorised"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "user") {
            return res.status(403).json({
                message: "you don't have access"
            });
        }

        req.user = decoded;
        next();

    } catch (err) {
        console.log(err);

        return res.status(401).json({
            message: "unauthorised"
        });
    }
}

module.exports={authArtist,authUser,auth}