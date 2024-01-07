import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './viewBus.css';
import Navbar from "../Navbar/Navbar";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {RootState }  from '../redux/store';
import {increment} from '../redux/totalAmount'

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

interface Passenger {
  passengerName: string;
  passengerEmail: string;
  passengerPhone: number;
  passengerAge: number;
}
interface People {
  id: number;
  status: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: number;
  passengerAge: number;
}

interface BookingDetails {
  customerId: number;
  busId:number;
  date: string;
  noOfSeats:number;
  totalAmount: number;
  status:string;
  seatsId:People[];
}
 

const GetBus = () => {

  const dispatch = useDispatch();
  const totalAmount = useSelector((state: RootState) => state.totalAmount)
  const navigate = useNavigate();

  const location = useLocation();

  const h = location.state.busData
  const sp = h.startingPoint
  const [seats, setSeats] = useState<Seat[]>([])
  const [busData, setBusData] = useState<Bus[]>([])
  const [date, setDate] = useState<{ date: string }>({
    date: ''
  });
const [busId, setBusId] = useState<{busId:number}>({
  busId:0
})
const [customerId, setCustomerID] = useState<number>(0)

  const [bookSeat, setBookSeat] = useState<SeatSelected[]>([])
  const [passengers, setPassengers] = useState<Passenger>({
    passengerName: '',
    passengerEmail: '',
    passengerPhone: 0,
    passengerAge: 0,
  })

  const [pass, setPass] = useState<People[]>([])
  const [isSeat, setIsSeat] = useState<boolean>(false)
  const [bookingData, setBookingData] = useState<BookingDetails>({
    customerId: 0,
    busId:0,
    date:'',
    noOfSeats:0,
    totalAmount: 0,
    status:'',
    seatsId:[],
})

  const token = localStorage.getItem('user')
  
  const custId = localStorage.getItem('customerId') 


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
        console.log('currentBus', currentBus);
        if (currentBus.length > 0) {
          setIsSeat(true)
        }
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

     setBusId({busId: selectedSeat.busId})

      if (!bookSeat.some((seat) => seat.id === selectedSeat.id)) {
        bookSeat.some((seat) => seat.id)
        setBookSeat(prev => {
          return [...prev, selectedSeat];
        })
        if (bookSeat.some((item) => item.offerPrice === 0)) {
          bookSeat.forEach((item) => {
            dispatch(increment(selectedSeat.seatCost))

          })
        } else {
          bookSeat.forEach((item) => {
            dispatch(increment(selectedSeat.offerPrice))

            })
        }
      }
    }
  }
  function passengerDetails(e: React.ChangeEvent<HTMLInputElement>): void {
    const name = e.target.name
    const value = e.target.value
    setPassengers({ ...passengers, [name]: value })
  }

  function addPassenger(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const seat = e.currentTarget.value
    if (!pass.some((item) => item.id === parseInt(seat))) {
      setPass((prev) => {
        return [...prev, { id: parseInt(seat),status:'booked', passengerName: passengers.passengerName, passengerEmail: passengers.passengerEmail, passengerPhone: passengers.passengerPhone, passengerAge: passengers.passengerAge }];
      });
    }
    const status:string = 'booked'
    if(custId) {
      const c = parseInt(custId)
      setCustomerID(c)
    }
    setBookingData({customerId:customerId, busId:busId.busId,date:date.date,noOfSeats: noOfSeats, totalAmount:totalAmount, status:status , seatsId: pass})
  }
  const noOfSeats = bookSeat.length

  async function api(url: string = "", bookingData = {}) {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(bookingData),
      
    })
    return result.json();
  }


  function booking() {
     console.log('setBookingData', bookingData);
     console.log('kk', JSON.stringify(bookingData));

    if(!bookingData){
      alert('enter all details')
    } else {
      api(`${process.env.REACT_APP_apiURL}/userBooking/addBooking`, bookingData).then((data) => {
        if (data.success === true) {

          
          alert('booking completed')
          console.log('booked',);
          
          navigate('/booking')
        } else {
          alert(data.message)
        }

      })
    }
  }

  return (
    <div >
      <Navbar></Navbar>
      <div>
        <div className="viewBusMain">
          <div className="buses">
            {
              busData.map((item) => {
                return (
                  <div className="bus" key={item.id}>
                    <h3 className="busName">{item.name}</h3>
                    <p>Starting Point: {item.starting_point}</p>
                    <p>Destination:{item.destination}</p>
                    <div className="dateSelect">
                      <input className="date" type="date" value={date.date} name="date" onChange={(e) => handleChange(e)} />
                      <button className="button" onClick={(e) => ViewSeats(e)} value={item.id}>Check Seats</button>
                    </div>
                  </div>
                )
              }
              )}
          </div>
          {
            isSeat ? (
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
                            <td><button className="seatbtn" onClick={(e) => selectSeat(e)} value={s.id}> <MdAirlineSeatReclineNormal />{s.id}</button></td>
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
                      <div key={s.id} className="passengerDetails">
                        <fieldset key={s.id}>
                          <p>Seat Number{s.id} </p>
                          <input type="text" placeholder="passenger name" name="passengerName" onChange={(e) => passengerDetails(e)} /><br></br>
                          <input type="email" placeholder="passenger email" name="passengerEmail" onChange={(e) => passengerDetails(e)} /><br></br>
                          <input type="number" placeholder="passenger phone" name="passengerPhone" onChange={(e) => passengerDetails(e)} /><br></br>
                          <input type="number" placeholder="passenger age" name="passengerAge" onChange={(e) => passengerDetails(e)} /><br></br>
                          <button value={s.id} onClick={(e) => addPassenger(e)}>Add</button>
                        </fieldset>
                      </div>
                    )
                  })
                  }
                  <p>Total: <span>{totalAmount}</span></p>
                  <button onClick={booking}>Add Booking</button>
                </div>
              </div>
            ) : (<></>)
          }
        </div>
      </div>
    </div>
  )
}

export default GetBus;
