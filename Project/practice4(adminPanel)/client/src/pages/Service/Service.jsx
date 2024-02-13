import React, { useEffect, useState } from "react";
import "./Service.css";
import design from "../../assets/design.png";

export default function Service() {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const resp = await fetch("http://localhost:5000/api/data/service");
    const data = await resp.json();
    setServiceData(data.response);
    console.log(data.response);
  };
  return (
    <div className="Service">
      <main>
        <h1>Services</h1>
        <section>
          {serviceData.map((eachServiceData, index) => (
            <div key={index} className="card">
              <div className="image">
                <img src={design} alt="Design" />
              </div>
              <div className="content">
              <div className="pp">
                <p>{eachServiceData.provider}</p>
                <p>{eachServiceData.price}</p>
              </div>
              <h2>{eachServiceData.service}</h2>
              <p>{eachServiceData.description}</p>
            </div>
            </div>
          ))} 
        </section>
      </main>
    </div>
  );
}
