import express from "express"; 
import { Router } from "express"; 

const router: Router = Router();

router.get("/", function(req ,res) { 
    res.json({
        message:"hi there"
    })
})



export default router


