import mongoose from "mongoose"
import type {Model} from "mongoose"
import {IUser} from "../types/interfaces/user.interface.js"


const userSchema = new mongoose.Schema<IUser>({
 email:{
  type:String,
  required:true,
  trim:true,
  lowercase:true,
  unique:true
 }
 password:{
  type:String,
  required:true,
  select:false
 }
},{timestamps:true})

userSchema.pre<IUser>("save",function(){
 if(!this.isModified("password")){
  return 
 }
 
 const hash = bcryptjs.hash(password,10)
 password = hash
})

userSchema.methods.comparePassword(async function(enteredPassword:string):Promise<boolean>{
 
 return await bcryptjs.compare(enteredPassword,this.password)
 
})

const UserModel:Model<IUser> = mongoose.model<IUser>("User",userSchema)