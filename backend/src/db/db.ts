import mongoose from "mongoose";

mongoose.connect("mongodb+srv://vbhavesh219:GLdKNb5gXUsAS351@cluster0.znlw8.mongodb.net/PaytmGo"); 

const userSchema = new mongoose.Schema({
    username: {type:String , require:true , unique: true}, 
    password: {type:String , require:true}, 
    firstName: String, 
    lastName: String,
})


export const UserModel = mongoose.model("User", userSchema);