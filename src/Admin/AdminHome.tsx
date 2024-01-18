import React, { useEffect, useState } from "react";
import axios from "axios";
import '../USer/ViewBus/viewBus.css';
import { TbBusStop } from "react-icons/tb";
import './adminHome.css'
import AdminNavbar  from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import AdminFooter from "../Footer/Footer";


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

  const token= localStorage.getItem('token')  
  const [busData, setBusData] = useState<Bus[]>([])
  const[seats, setSeats] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const url = `${process.env.REACT_APP_apiURL}/userBus/viewBuses`

      const { data } = await axios.get(url, {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
      )
      const buses = data.data.data
      setBusData(buses);
    }
    fetch();
  }, [token])


  function getSeats(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const busId = e.currentTarget.value
    
    if(busId!== undefined) {
      axios(`${process.env.REACT_APP_apiURL}/adminBus/adminViewSeats?busId=${busId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        const seat = res.data.data
        setSeats(seat)

      }).catch(e => {
        console.log(e);
      })
    }
  }
  console.log('n ' ,seats);
  if(seats.length > 0){
    navigate('/adminViewSeats', {state: {seats}})
  }

  return (
    <div >
      <AdminNavbar></AdminNavbar>
      <div>
        <div>         
        </div>
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


