import mongoose from "mongoose"

const dbconnect = async () =>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MongoDB at ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to mongodb"+error)
    }
}

export default dbconnect