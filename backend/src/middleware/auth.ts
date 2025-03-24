import jwt from "jsonwebtoken"; 
import { Request , Response , NextFunction } from "express";;


export const userMiddleware  = (req: Request , res: Response , next:NextFunction) => { 
    const header = req.headers['authorization'];

    const decoded = jwt.verify(header as string,"SECRET")

    if(decoded){
        //@ts-ignore
        req.userId = decode.userId;
        next();
    }else{ 
        res.json({ 
            message:"you are not logined",
        })
    }

}
