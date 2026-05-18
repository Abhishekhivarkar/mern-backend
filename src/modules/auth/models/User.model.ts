import mongoose from "mongoose"
import type {Model} from "mongoose"
import type {IUser} from "../types/auth.interface.js"
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema<IUser>({
 email:{
  type:String,
  required:true,
  trim:true,
  lowercase:true,
  unique:true
 },
 password:{
  type:String,
  required:true,
  select:false
 }
},{timestamps:true})

userSchema.pre("save",async function(){
    
 if(!this.isModified("password")){
  return 
 }
 
 const hash =await bcryptjs.hash(this.password,10)
this.password = hash
    
})

userSchema.methods.comparePassword= async function(enteredPassword:string):Promise<boolean>{
 
 return await bcryptjs.compare(enteredPassword,this.password)
 
}

const UserModel:Model<IUser> = mongoose.model<IUser>("User",userSchema)

export default UserModel