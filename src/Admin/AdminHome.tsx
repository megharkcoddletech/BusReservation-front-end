import React, { useState } from "react";
import '../USer/ViewBus/viewBus.css';
import { TbBusStop } from "react-icons/tb";
import './adminHome.css'
import AdminNavbar  from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import AdminFooter from "../Footer/Footer";
import GetApiCall from "../GetApi/GetApiCall";

interface Bus {
  main: string
  blanket: boolean;
  boarding_time: string;
  bus_number: string;
  cctv: boolean;
  charging_point: boolean;
  deboarding_time: string;
  destination: string;
  emergency_contacts: boolean;
  fare_per_km: number;
  id: number;
  m_ticket: boolean;
  name: string;
  ratings: number;
  reading_light: boolean;
  starting_point: string;
  status: string;
  type: string;
}

const AdminHome = () => {

  const navigate =useNavigate()

  const [busData, setBusData] = useState<Bus[]>([])
  const[seats, setSeats] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
    if(loading){
      const response = GetApiCall( `${process.env.REACT_APP_apiURL}/userBus/viewBuses`)   
      response.then(res =>{
       const bus = res.data
         setBusData(bus)
      }).catch (err =>{
        console.log(err);
      })
     setLoading(false)
    }
   
  function getSeats(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const busId = e.currentTarget.value
    
    if(busId !== undefined) {

      const getSeats = GetApiCall(`${process.env.REACT_APP_apiURL}/adminBus/adminViewSeats?busId=${busId}`)
      getSeats.then(res => {
        const data = res
        console.log('seat data',data);
        
        setSeats(res)
      }).catch(err =>{
        console.log(err);
      })
    }
  }
  console.log('n ' ,seats);
  if(seats.length > 0){
    navigate('/adminViewSeats', {state: {seats}})
  }

  return (
    <div className="adminRoot" >
      <AdminNavbar></AdminNavbar>
      <div>

        <h1>All Buses</h1>

        <div className="viewBusMain">
          {
              busData.map((item) => {
                return (
                  <div className="bus" key={item.id}>
                    <h3 className="busName"><TbBusStop />{item.name}</h3>
                    <p>Starting Point: {item.starting_point}</p>
                    <p>Destination:{item.destination}</p>
                    <button value={item.id} className="booking" onClick={(e) => getSeats(e)}>ViewSeats</button>
                  </div>
                )
              }
              )}
        </div>
      </div>
      <AdminFooter></AdminFooter>
    </div>
  )
}

export default AdminHome;


