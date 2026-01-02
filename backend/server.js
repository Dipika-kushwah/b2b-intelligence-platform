// server.js
const express      = require("express");
const mongoose     = require("mongoose");
const cors         = require("cors");
const bodyParser   = require("body-parser");
const jwt          = require("jsonwebtoken");

const app = express();

/* ── middle‑ware ─────────────────── */
app.use(cors());
app.use(bodyParser.json());

/* ── DB connect ───────────────────── */
mongoose.connect("mongodb://localhost:27017/freeTrial")
  .then(()=>console.log("✅ MongoDB connected"))
  .catch(e => console.error("Mongo error:",e));

/* ── Models ───────────────────────── */
const Company = require("./models/Company");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    fullName:String,email:{type:String,unique:true},company:String,phone:String,
    trialStart:Date,trialEnds:Date,password:String
  })
);

/* ── Auth routes (tiny demo) ──────── */
app.post("/api/auth/login", async (req,res)=>{
  const {email,password} = req.body;
  let user = await User.findOne({email}) || await User.create({email,password});
  const token = jwt.sign({email}, "secretKey123",{expiresIn:"1h"});
  res.json({token});
});

app.post("/api/auth/register", async (req,res)=>{
  const {fullName,email,company,phone} = req.body;
  if(!fullName||!email||!company||!phone)
    return res.status(400).json({message:"All fields required"});
  if(await User.findOne({email}))
    return res.status(409).json({message:"Trial already started"});

  const trialStart = new Date();
  const trialEnds  = new Date(trialStart.getTime()+7*24*60*60*1000);
  await User.create({fullName,email,company,phone,trialStart,trialEnds});
  res.json({message:"Trial ok",trialEnds});
});

/* ── Company routes ───────────────── */
const companyRoutes = require("./routes/companyRoutes");
app.use("/api/data", companyRoutes);

/* ── Start server ─────────────────── */
const PORT = 5000;
app.listen(PORT, ()=> console.log(`🚀  http://localhost:${PORT}`));
