import mongoose from "mongoose"

await mongoose.connect(
"mongodb+srv://abhishek783:abhiadi2004@cluster0.0kreanc.mongodb.net/mern-backend?retryWrites=true&w=majority"
)

console.log(
"connected"
)