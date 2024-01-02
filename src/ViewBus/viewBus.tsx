import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './viewBus.css';
import Navbar from "../Navbar/Navbar";

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

interface Seat {
  main: string;
  busId: number;
  id: number;
  seatCost: number;
  seatType: string;
  offerPrice: number;
}
interface SeatSelected {
  main: string;
  busId: number;
  id: number;
  seatCost: number;
  seatType: string;
  offerPrice: number;
}


const GetBus = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const h = location.state.busData
  console.log('startingPoint', h);
  const sp = h.startingPoint
  const [seats, setSeats] = useState<Seat[]>([])
  const [busData, setBusData] = useState<Bus[]>([])
  const [date, setDate] = useState<{ date: string }>({
    date: ''
  });
  const [totalAmount, setTotalAmount] = useState<{ totalAmount: number }>({
    totalAmount: 0
  })
  const [bookSeat, setBookSeat] = useState<SeatSelected[]>([])
  const token = localStorage.getItem('user')

  useEffect(() => {
    const fetch = async () => {
      console.log('inside', sp);
      let url;
      if (!h.startingPoint && !h.destination && !h.boardingTime) {
        url = `${process.env.REACT_APP_apiURL}/userBus/viewBuses`
      } else if (!h.destination && !h.boardingTime) {
        url = `${process.env.REACT_APP_apiURL}/userBus/viewBuses?startingPoint=${encodeURIComponent(h.startingPoint)}`
      } else if (!h.boardingTime) {
        url = `${process.env.REACT_APP_apiURL}/userBus/viewBuses?startingPoint=${encodeURIComponent(h.startingPoint)}&destination=${encodeURIComponent(h.destination)}`
      } else {
        url = `${process.env.REACT_APP_apiURL}/userBus/viewBuses?startingPoint=${encodeURIComponent(h.startingPoint)}&destination=${encodeURIComponent(h.destination)}&boardingTime=${encodeURIComponent(h.boardingTime)}&page=${encodeURIComponent(h.page)}`
      }
      const { data } = await axios.get(url, {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
      )
      console.log('dst', data);
      console.log(data.data);
      const buses = data.data.data
      setBusData(buses);
      console.log('g', buses);
      console.log(Array.isArray(buses));
    }
    fetch();
  }, [h.boardingTime, h.destination, h.page, h.startingPoint, sp, token])

  const ViewSeats = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault();
    console.log('target', e.currentTarget.value);
    const btnId = parseInt(e.currentTarget.value)
    if (date.date) {
      axios(`${process.env.REACT_APP_apiURL}/userBus/viewSeats?date=${date.date}`, {
        method: 'GET',
        headers: {
          'Content-type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        const seat = res.data.data
        console.log('res.data', res.data.data);
        const currentBus = seat.filter((i: { busId: number; }) => i.busId === btnId);
        console.log('cuurentBus', currentBus);
        setSeats(currentBus)
      }).catch(e => {
        console.log(e);
      })
    } else {
      alert('enter date')
    }

  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setDate({ ...date, [e.target.name]: e.target.value })
  }

  function selectSeat(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    const seatId = parseInt(e.currentTarget.value)
    const selectedSeat = seats.find((item) => item.id === seatId);

    if (selectedSeat) {

      if (!bookSeat.some((seat) => seat.id === selectedSeat.id)) {
        setBookSeat(prev => {
          return [...prev, selectedSeat];
        })
        console.log('ppo', bookSeat);
        let t = 0
        if (bookSeat.some((item) => item.offerPrice === 0)) {
          bookSeat.forEach((item) => {
            t = item.seatCost
          })
        } else {
          bookSeat.forEach((item) => {
            t += item.offerPrice

          })
        }
        setTotalAmount({ totalAmount: t })

      }
      console.log('too', totalAmount);
    }

  }
  console.log('bbbbbokked seat', bookSeat);

  function booking() {
    navigate('/booking', { state: { totalAmount, bookSeat } })
  }

  return (
    <div >
      <Navbar></Navbar>
      <div >
        <div className="viewBusMain">
          <div className="viewbuses">
            {
              busData.map((item) => {
                return (
                  <div className="bus" key={item.id}>
                    <button>{item.name}</button>
                    <p>Starting Point: {item.starting_point}</p>
                    <p>Destination:{item.destination}</p>
                    <input className="date" type="date" value={date.date} name="date" onChange={(e) => handleChange(e)} />
                    <button className="getSeats" onClick={(e) => ViewSeats(e)} value={item.id}>Check Seats</button>
                  </div>
                )
              }
              )}
          </div>
          <div className="viewSeats">
            <table>
              <thead>
                <tr>
                  <th>
                    Seat number
                  </th>
                  <th>
                    Seat Type
                  </th>
                  <th>
                    Seat Cost
                  </th>
                  <th>
                    OfferPrice
                  </th>
                </tr>
              </thead>
              {
                seats.map((s) => {
                  return (
                    <tbody key={s.id}>
                      <tr>
                        <td><button onClick={(e) => selectSeat(e)} value={s.id}>{s.id}</button></td>
                        <td>{s.seatType}</td>
                        <td>{s.seatCost}</td>
                        <td>{s.offerPrice}</td>
                      </tr>
                    </tbody>
                  )
                })
              }
            </table>
            <div className="markedSeat">
              {bookSeat.map((s) => {
                return (
                  <p key={s.id}>{s.id}{","}</p>
                )

              })
              }
              <button onClick={booking}>Add Booking</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default GetBus;
