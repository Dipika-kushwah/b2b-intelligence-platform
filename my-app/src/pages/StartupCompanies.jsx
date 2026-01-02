import React,{useState,useEffect} from "react";
import axios from "axios";
import CompanyTable from "../components/CompanyTable";
import "../styles/ZoomInfo.css";

export default function StartupCompanies(){
  const [data,setData]=useState([]);
 useEffect(() => {
  axios.get("http://localhost:5000/api/data/startup")
    .then(res => setData(res.data))
    .catch(err => console.error(err));
}, []);

  return(
    <div className="zi-container">
      <header className="zi-topbar"><h1>Startup Companies</h1></header>
      <CompanyTable title="Startups" data={data} color="#1e88e5"/>
    </div>
  );
}
