import express from "express"; 
import { z } from "zod"; 
import jwt from "jsonwebtoken"
import { Router } from "express"; 
import {UserModel} from "../db/db"
import { userMiddleware } from "../middleware/auth";

const router: Router = Router();

const userSchema = z.object({ 
    username: z.string().email(), 
    password: z.string().min(5), 
    firstName: z.string().max(15),
    lastName: z.string()
})

router.post("/signup", async(req ,res) => {    
    const {username , password , firstName , lastName } = req.body; 
    
    const existingUser = await UserModel.findOne({ 
        username:username
    })
    
    if(existingUser){ 
        res.status(411).json({ 
            message:"User already created",
        })
        return;
    }
    
    const user = await UserModel.create({ 
        username: username, 
        password: password, 
        firstName: firstName, 
        lastName: lastName
    })
    
    if(user){ 
        res.status(200).json({ 
            result:user,
        })
    }else{ 
        res.json({ 
            message:"User not able to connect",
        })
    }
})

router.post("/signin", async(req ,res) => {
    const {username , password} = req.body;

    const user = await UserModel.findOne({ 
        username:username,
        password:password
    })

    if(user){ 
        const token = jwt.sign({ 
            userId:user._id
        }, "SECRET");
        
        res.status(200).json({ 
            token:token
        })
    }else{ 
        res.json({ 
            message:"error while signin user"
        })
    }
})

router.put("/", userMiddleware , async(req ,res) => {

    //@ts-ignore
    const user = await UserModel.updateOne({_id: req.userId}, req.body)

    if(user){ 
        res.status(200).json({ 
            result:"user updated sucessfully",
        })
    }else{ 
        res.json({ 
            message:"Error while updating user"
        })
    }
})

router.get("/bulk", async(req ,res) => {
    const filter = req.query.filter || ""; 

    const users = await UserModel.find({ 
        $or:[{ 
            firstName:{
                "$regex":filter
            }
        }, { 
            lastName:{ 
                "$regex":filter
            }
        }]
    })

    console.log(users)
})




export default router;
