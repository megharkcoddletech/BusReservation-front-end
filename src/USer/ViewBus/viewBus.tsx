import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './viewBus.css';
import Navbar from "../Navbar/Navbar";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../redux/store';
import { increment, decrement } from '../../redux/totalAmount';
import { TbBusStop } from "react-icons/tb";
import GetApiCall from "../../GetApi/GetApiCall";
import PostApiCall from "../../GetApi/PostApiCall";
import Footer from "../../Footer/Footer";
import { WiSunrise } from "react-icons/wi";
import { IoCloudyNightOutline } from "react-icons/io5";
import { TbSunset2 } from "react-icons/tb";
import { IoCloudyNightSharp } from "react-icons/io5";
import { GiCctvCamera } from "react-icons/gi";
import { IoTicket } from "react-icons/io5";
import { BiBlanket } from "react-icons/bi";
import { PiPlugChargingFill } from "react-icons/pi";
import { IoMdCall } from "react-icons/io";




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
  gender: string;
  passengerAge: number;

}
interface People {
  id: number;
  status: string;
  passengerName: string;
  gender: string;
  passengerAge: number;
}

interface BookingDetails {
  customerId: number;
  busId: number;
  date: string;
  noOfSeats: number;
  totalAmount: number;
  status: string;
  seatsId: People[];
}


const GetBus = () => {

  const dispatch = useDispatch();
  const totalAmount = useSelector((state: RootState) => state.totalAmount)

  const navigate = useNavigate();

  const location = useLocation();

  const h = location.state.busData
  const [seats, setSeats] = useState<Seat[]>([])
  const [busData, setBusData] = useState<Bus[]>([])
  const [date, setDate] = useState<{ date: string }>({
    date: ''
  });

  const [busId, setBusId] = useState<number>(0)

  const [bookSeat, setBookSeat] = useState<SeatSelected[]>([])
  const [passengers, setPassengers] = useState<Passenger>({
    passengerName: '',
    gender: '',
    passengerAge: 0,
  })
  const [seatDetails, setSeatDetails] = useState<number[]>([])
  const [isSeat, setIsSeat] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [seatMessage, setSeatMessage] = useState<boolean>(false)

  let url
  if (!h.startingPoint && !h.destination && !h.boardingTime) {
    url = `${process.env.REACT_APP_apiURL}/userBus/viewBuses`
  } else if (!h.destination && !h.boardingTime) {
    url = `${process.env.REACT_APP_apiURL}/userBus/viewBuses?startingPoint=${encodeURIComponent(h.startingPoint)}`
  } else if (!h.boardingTime) {
    url = `${process.env.REACT_APP_apiURL}/userBus/viewBuses?startingPoint=${encodeURIComponent(h.startingPoint)}&destination=${encodeURIComponent(h.destination)}`
  } else {
    url = `${process.env.REACT_APP_apiURL}/userBus/viewBuses?startingPoint=${encodeURIComponent(h.startingPoint)}&destination=${encodeURIComponent(h.destination)}&boardingTime=${encodeURIComponent(h.boardingTime)}&page=${encodeURIComponent(h.page)}`
  }
  if (loading) {
    const buses = GetApiCall(url)
    buses.then(res => {
      setBusData(res.data);
      setLoading(false)
    }).catch(err => {
      console.log(err);
    })
  }

  const ViewSeats = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault();
    const btnId = parseInt(e.currentTarget.value)
    if (date.date) {
      const checkSeat = GetApiCall(`${process.env.REACT_APP_apiURL}/userBus/viewSeats?date=${date.date}`)
      checkSeat.then(res => {
        const currentBus = res.filter((i: { busId: number; }) => i.busId === btnId);
        if (currentBus.length > 0) {
          setIsSeat(true)
        }
        setSeats(currentBus)
        console.log('view seats', res);
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

      setBusId(selectedSeat.busId)
      if (!bookSeat.some((seat) => seat.id === selectedSeat.id)) {
        setBookSeat(prev => {
          return [...prev, selectedSeat];
        })
        setSeatDetails(prev => {
          return [...prev, selectedSeat.id]
        })
        setSeatMessage(true)
        console.log('selected seettt', selectedSeat);
        if (selectedSeat.offerPrice === 0) {
          dispatch(increment(selectedSeat.seatCost))
          console.log('seat cost  add', selectedSeat.seatCost);

        } else {
          dispatch(increment(selectedSeat.offerPrice))
          console.log('seat cost  add', selectedSeat.offerPrice);

        }
      } else {
        setBookSeat((bookSeat) => bookSeat.filter((item) => item.id !== selectedSeat.id))
        setSeatDetails((seatDetails) => seatDetails.filter((item) => item !== selectedSeat.id))
        if (selectedSeat.offerPrice === 0) {
          dispatch(decrement(selectedSeat.seatCost))
        } else {
          dispatch(decrement(selectedSeat.offerPrice))
        }
      }
    }
  }


  const noOfSeats = bookSeat.length

  function booking() {
    if (seatDetails.length > 0) {
      navigate('/bookingProcess', { state: { busId: busId, date: date.date, noOfSeats: noOfSeats, totalAmount: totalAmount, status: 'status', seats: seatDetails } })
    } else {
      alert('select seat to proceed booking')
    }

  }

  function remove(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = e.currentTarget.value
    const selectedSeat = seats.find((item) => item.id === parseInt(id));
    console.log('kijijiji', selectedSeat);
    if (selectedSeat) {
      if (bookSeat.some((seat) => seat.id === selectedSeat.id))
        setBookSeat((bookSeat) => bookSeat.filter((item) => item.id !== selectedSeat.id))
      setSeatDetails((seatDetails) => seatDetails.filter((item) => item !== selectedSeat.id))
      if (selectedSeat.offerPrice === 0) {
        console.log('seat cost  remove', selectedSeat.seatCost);

        dispatch(decrement(selectedSeat.seatCost))
      } else {
        dispatch(decrement(selectedSeat.offerPrice))
        console.log('seat cost  remove', selectedSeat.offerPrice);

      }
    }
  }


  console.log('book seat', bookSeat);
  console.log('seat only ', seatDetails);
  return (
    <div >
      <div className="navDiv">
        <Navbar></Navbar>
      </div>
      <div className="viewBusMain">
        <div className="sideBar">
          <h3>Filters</h3>
          <div>
            <div className="timeFilter">
              <h4>Time Filter</h4>
              <div>
                <input id='one' type="checkbox" className="ck" style={{ display: "none" }} value={1} />
                <div className="innerCheckbox" >
                  <label htmlFor='one'>
                    <div className="checkboxDiv">
                      <WiSunrise />
                    </div>
                  </label>
                  <label className="filterLabel">6 AM to 12 PM</label>
                </div>
              </div>

              <div>
                <input type="checkbox" className="checkBox" value={2} />
                <div className="innerCheckbox">
                  <label>
                    <div className="checkboxDiv">
                      <TbSunset2 />
                    </div>
                  </label>
                  <label className="filterLabel">12 PM to 6 PM</label>
                </div>
              </div>

              <div>
                <input id='two' type="checkbox" className="checkBox" value={3} />
                <div className="innerCheckbox">
                  <label htmlFor="two">
                    <div className="checkboxDiv">
                      <IoCloudyNightOutline />
                    </div>
                  </label>
                  <label className="filterLabel"> 6 PM to 12 AM</label>
                </div>
              </div>


              <div>
                <input id="four" type="checkbox" className="checkBox" value={4} />
                <div className="innerCheckbox">

                  <label htmlFor="four">
                    <div className="checkboxDiv">
                      <IoCloudyNightSharp />
                    </div>
                  </label>
                  <label className="filterLabel"> 12 AM to 6 AM</label>
                </div>
              </div>

            </div>


            <div className="Amenities">
              <h4>Bus Amenities</h4>

              <div>
                <input type="checkbox" className="checkBox" value={"cctv"} />
                <div className="innerCheckbox">
                  <label>
                    <div className="checkboxDiv">
                      <GiCctvCamera />
                    </div>
                  </label>
                  <label className="filterLabel">CCTV </label>
                </div>

              </div>


              <div>
                <input type="checkbox" className="checkBox" value={"blanket"} />

                <div className="innerCheckbox">
                  <label>
                    <div className="checkboxDiv">
                      <BiBlanket />
                    </div>
                  </label>
                  <label className="filterLabel">Blanket </label>
                </div>
              </div>


              <div>
                <input type="checkbox" className="checkBox" value={"mTicket"} />

                <div className="innerCheckbox">
                  <label>
                    <div className="checkboxDiv">
                      <IoTicket />
                    </div>
                  </label>
                  <label className="filterLabel">M-Ticket</label>
                </div>
              </div>

              <div>
                <input type="checkbox" className="checkBox" value={"charging"} />
                <div className="innerCheckbox">
                  <label>
                    <div className="checkboxDiv">
                      <PiPlugChargingFill />
                    </div>
                  </label>
                  <label className="filterLabel">Charging Point</label>
                </div>
              </div>

              <div>
                <input type="checkbox" className="checkBox" value={"emergency"} />
                <div className="innerCheckbox">
                  <label>
                    <div className="checkboxDiv">
                      <IoMdCall />
                    </div>
                  </label>
                  <label className="filterLabel">Emergency Number</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buspart">
          <div className="buses">
            {
              busData.map((item) => {
                return (
                  <div className="bus" key={item.id}>
                    <h3 className="busName"><TbBusStop />{item.name}</h3>
                    <p>Starting Point: {item.starting_point}</p>
                    <p>Destination:{item.destination}</p>
                    <div className="dateSelect">
                      <input className="date" type="date" value={date.date} name="date" onChange={(e) => handleChange(e)} />
                      <button className="checkButton" onClick={(e) => ViewSeats(e)} value={item.id}>Check Seats</button>
                    </div>
                  </div>
                )
              }
              )}
          </div>
          {
            isSeat ? (
              <div className="viewSeats">
                <p>select seats by clicking on the seat number</p>
                <table className="seatTable">
                  <thead className="tableHead">
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
                        <tbody key={s.id} className="tableBody">
                          <tr>
                            <td>
                              <button className="seatbtn" onClick={(e) => selectSeat(e)} value={s.id}>
                                <MdAirlineSeatReclineNormal className="seatIcon" />
                                {s.id}</button>
                            </td>
                            <td>{s.seatType}</td>
                            <td>{s.seatCost}</td>
                            <td>{s.offerPrice}</td>
                          </tr>
                        </tbody>
                      )
                    })
                  }
                </table>

                {
                  seatMessage ?
                    (
                      <div className="addtocart">
                        <p className="seatSelected">Selected Seat</p>
                        <div>
                          {
                            seatDetails.map(s => {
                              return (
                                <div className="seatCart" key={s}>
                                  <p>{s}</p>
                                  <button value={s} className="removebtn" onClick={(e) => remove(e)}>remove</button>
                                </div>
                              )
                            })
                          }
                        </div>


                        <p>Total: <span>{totalAmount}</span></p>
                        <button className="checkButton" onClick={booking}>continue Booking</button>

                      </div>
                    ) : (<></>)
                }
              </div>
            ) : (<></>)
          }
        </div>

      </div>
      <Footer></Footer>
    </div>
  )
}

export default GetBus;
