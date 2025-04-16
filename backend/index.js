const express=require("express")
const app=express();

const userRoute=require("./routes/User")
const profileRoute=require("./routes/Profile")
const paymentRoute=require("./routes/Payment")
const courseRoute=require("./routes/Course")

require("dotenv").config();

const database=require("./config/database")
const cookiesParser=require("cookie-parser")
const cors=require("cors")
const fileupload=require("express-fileupload")
const {cloudinaryConnect}=require("./config/cloudinary")


const PORT=process.env.PORT || 4000

database.connect();

app.use(express.json());
app.use(cookiesParser());
app.use(cors({
    origin:"http://localhost:3000",credentials:true,

}))
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

cloudinaryConnect();

app.use("/api/v1/auth",userRoute)
app.use("/api/v1/profile",profileRoute)
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/payment",paymentRoute)

app.get("/",(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"your server is running"
    });
});

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`);
})
