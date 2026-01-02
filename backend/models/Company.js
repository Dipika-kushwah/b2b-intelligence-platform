const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  ARR:          Number,
  COMPANY:      String,
  DOMAIN:       String,
  YEAR:         Number,
  "TEAM SIZE":  String,
  HEADQUARTER:  String,
  "NO. OF OFFICES": Number,
  "GROWTH RATE": String,
  WEBSITE:      String,
  MAIL:         String,
  CONTACT:      String,
  LINKEDIN:     String,
  FACEBOOK:     String,
  TWITTER:      String,
  SOURCE:       String,
  REGION:       String            //  "India" | "US" | "Startup"
});

module.exports = mongoose.model("Company", companySchema);
