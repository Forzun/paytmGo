import express from "express"; 
import { z } from "zod"; 
import jwt from "jsonwebtoken"; 
import { Router } from "express"; 
import { AccountModel } from "../db/db";
import { userMiddleware } from "../middleware/auth";
import mongoose from "mongoose";

const router: Router = Router();

router.get('/balance', userMiddleware, async (req ,res) => { 
    try{
        //@ts-ignore
        const userId = req.userId
        const account = await AccountModel.findOne({ 
            userId: userId,
        })

        res.json({ 
            balance: account?.balance
        })
        
    }catch(error){ 
        res.json({ 
            message:"Connection error"
        })
    }
})

router.post('/transfer', userMiddleware , async (req ,res) => { 
    const session = await mongoose.startSession(); 

    session.startTransaction();
    const { amount , to} = req.body; 

    //@ts-ignore
    const account: any = await AccountModel.findOne({userId: req.userId}).session(session); 

    if(!account || account.balance < amount){ 
        await session.abortTransaction(); 
        res.status(400).json({ 
            message:"insufficient balance",
        })
        return;
    }

    const toAccount = await AccountModel.findOne({userId:to}).session(session); 

    if(!toAccount){
        await session.abortTransaction(); 
        res.status(400).json({ 
            message:"Invalid account",
        })
        return ;
    }

    //@ts-ignore
    await AccountModel.updateOne({userId:req.userId}, { 
        $inc:{ 
            balance: -account
        }
    }).session(session);
    
    await AccountModel.updateOne({userId:to}, { 
        $inc: {
            balance: amount
        }
    }).session(session); 

    await session.commitTransaction();
    res.json({ 
        message:"Transfer Successfully"
    })

})

export default router;