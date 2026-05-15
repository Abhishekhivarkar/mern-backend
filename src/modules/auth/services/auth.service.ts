export const registerService = async(data) =>{
 const user = await register(data)
 
 if(user){
  throw new AppError("user already register",401)
 }
 
 return user
}