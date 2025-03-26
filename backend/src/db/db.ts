import mongoose, { model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://vbhavesh219:GLdKNb5gXUsAS351@cluster0.znlw8.mongodb.net/PaytmGo"); 

const userSchema = new mongoose.Schema({
    username: {type:String , require:true , unique: true}, 
    password: {type:String , require:true}, 
    firstName: String, 
    lastName: String,
})

const accountSchema = new mongoose.Schema({ 
    userId:{type: Schema.Types.ObjectId, ref:"User"}, 
    balance:{type: Number , require: true}
})

const AccountModel = mongoose.model("Account", accountSchema);


export const UserModel = mongoose.model("User", userSchema);

module.exports = { 
    AccountModel
}