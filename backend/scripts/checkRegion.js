const mongoose = require("mongoose");
const Company = require("../models/Company");

mongoose.connect("mongodb://localhost:27017/loginTrial")
  .then(async () => {
    console.log("✅ MongoDB connected");

    const companies = await Company.find({}, { COMPANY: 1, REGION: 1 });
    companies.forEach((c) => {
      console.log(`${c.COMPANY} => ${c.REGION}`);
    });

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
  });
