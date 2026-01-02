const express  = require("express");
const router   = express.Router();
const Company  = require("../models/Company");

const send = (res, p) =>
  Company.find(p).then(d => res.json(d)).catch(_=>res.status(500).json({error:"server"}));
router.get("/",        (_req,res)=> send(res, {}));
router.get("/india",   (_req,res)=> send(res, { REGION: "India" }));
router.get("/us",      (_req,res)=> send(res, { REGION: "US" }));
router.get("/startup", (_req,res)=> send(res, { REGION: "Startup" }));
router.get("/search",  (req,res)=> {
  const q = req.query.q || "";
  send(res, { COMPANY: new RegExp(q,"i") });
});

module.exports = router;
