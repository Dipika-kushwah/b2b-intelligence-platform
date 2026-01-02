const mongoose = require("mongoose");
const Company = require("../models/Company");

mongoose.connect("mongodb://localhost:27017/loginTrial")
  .then(async () => {
    console.log("✅ Connected to DB");

    const allCompanies = await Company.find();

    for (let company of allCompanies) {
      if (!company.REGION) {
        let region = "";

        if (/india/i.test(company.HEADQUARTER)) region = "India";
        else if (/usa|united states/i.test(company.HEADQUARTER)) region = "US";
        else if (/startup/i.test(company.DOMAIN)) region = "Startup";

        if (region) {
          company.REGION = region;
          await company.save();
          console.log(`🟢 Updated ${company.COMPANY} => ${region}`);
        }
      }
    }

    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ Error:", err));
