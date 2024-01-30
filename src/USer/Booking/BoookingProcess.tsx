import React, {useState } from "react";
import { useLocation, useNavigate, } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './BookingProcess.css';
import { FaBus } from "react-icons/fa6";
import Footer from "../../Footer/Footer";
import PostApiCall from "../../GetApi/PostApiCall";

interface Passenger {
    [key: string]: {
        passengerName: string;
        passengerAge: number;
        gender: string;
    };
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

interface People {
    id: number;
    status: string
    passengerName: string;
    gender: string | number;
    passengerAge: number;
}

interface Seat {
    id: number;
    status: string;
    passengerName: string;
    gender: string | number;
    passengerAge: number;
}

const BookingProcess = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [paymentPart, setPaymentPart] = useState<boolean>(true)
    const [paymentOption, setPaymentOption] = useState<string>('')

    const [passenger, setPassenger] = useState<Passenger>(
        {
        }
    );


    const [bookingData, setBookingData] = useState<BookingDetails>({
        customerId: 0,
        busId: 0,
        date: '',
        noOfSeats: 0,
        totalAmount: 0,
        status: '',
        seatsId: [],
    })


    const seats = location.state.seats

    function passengerDetails(e: React.ChangeEvent<HTMLInputElement>, seatId: number) {

        setPassenger((prev) => ({
            ...prev,
            [seatId]: {
                ...prev[seatId],
                [e.target.name]: e.target.value
            }
        }))

    }


    function selectPayment() {
        setPaymentPart(false)

        let seatDetails: Seat[] = [];
        Object.keys(passenger).forEach((item) => {
            const passengerId = item;
            const passengerInfo = passenger[item];
            const genderKey = Object.keys(passengerInfo).find(element => element.startsWith('gender'));
 
            if (genderKey !== undefined) {
                const gender = passengerInfo[genderKey as keyof typeof passengerInfo];
                
                if (passengerInfo.passengerAge && passengerId) {
                    const passengerObject = {
                        id: parseInt(passengerId),
                        status: 'booked',
                        passengerName: passengerInfo.passengerName,
                        gender: gender,
                        passengerAge: passengerInfo.passengerAge,
                    };
                    seatDetails.push(passengerObject);
                }
                const custId = localStorage.getItem('customerId')
                if (custId) {
                    bookingData.customerId = parseInt(custId)
                    setBookingData({customerId: parseInt(custId), busId:location.state.busId,date:location.state.date, noOfSeats:location.state.noOfSeats, totalAmount:parseInt(location.state.totalAmount),status:'booked', seatsId:seatDetails})

                }
            }

        });
        
    }

    function Booking() {
        console.log('inside bboking boking dat ', bookingData);

        if (bookingData.date) {

            PostApiCall(`${process.env.REACT_APP_apiURL}/userBooking/addBooking`, bookingData).then((data) => {
                if (data.success === true) {
                    alert('booking completed')
                    navigate('/booking')
                } else {
                    alert(data.message)
                }
            })
        }

    }

    return (
        <div>
            <div className="navBooking">
                <Navbar></Navbar>
            </div>
            <div className="bookingMain">

                {
                
                            paymentPart ?
                                (
                                    <div className="bookingProcess">
                                        <div>
                                            <div className="bookingProcessHead">
                                                <div className="title">Passenger Details</div>
                                                <div className="title">Payment Details</div>
                                            </div>
                                            <div className="passenger">
                                                {
                                                    seats.map((seatId: number, index: number) => {
                                                        return (
                                                            <div key = {seatId} className="passengerDetails">
                                                                <div className="seatNumber">{seatId}</div>
                                                                <input className="passenger name" type="text" placeholder="passenger name" name={`passengerName`} onChange={(e) => passengerDetails(e, seatId)} /><br></br>
                                                                <input className="passenger age" type="number" placeholder="passenger age" name={`passengerAge`} onChange={(e) => passengerDetails(e, seatId)} /><br></br>
                                                                <div className="passengerGender">
                                                                    <input className="radiobtn" type="radio" name={`gender${seatId}`} value="female" onChange={(e) => passengerDetails(e, seatId)} />
                                                                    <label>{"female"}</label>
                                                                    <input className="radiobtn" type="radio" name={`gender${seatId}`} value="male" onChange={(e) => passengerDetails(e, seatId)} />
                                                                    <label>{"male"}</label>
                                                                    <input className="radiobtn" type="radio" name={`gender${seatId}`} value="others" onChange={(e) => passengerDetails(e, seatId)} />
                                                                    <label>{"others"}</label>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                          <div>
                                            <button  className="proceedtoPayment" onClick={() => selectPayment()}>
                                               proceed to payment
                                               </button>
                                           </div>
                                    </div>
                                ) : (
                                    <div className="bookingProcess">
                                        <div>
                                            <div className="bookingProcessHead">
                                                <div className="title">Passenger Details</div>
                                                <div className="title">Payment Details</div>
                                            </div>
                                            <div className="passenger">
                                                <h3>Select your payment Method</h3>
                                                <div className="paymentOptions">
                                                    <div className="paymentCard">
                                                        <button onClick={(e) => setPaymentOption('paytm')} className="paybtn" value={"paytm"}>
                                                            <div className="payOption paytm">
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div className="paymentCard">
                                                        <button onClick={(e) => setPaymentOption('googlepay')} className="paybtn" value={"googlepay"}>
                                                            <div className="payOption google" >
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div className="paymentCard">
                                                        <button onClick={(e) => setPaymentOption('billdesk')} className="paybtn" value={"billdesk"}>
                                                            <div className="payOption biilDesk">
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                            <div>
                                                
                                              <button className="proceedtoPayment" onClick={Booking}>pay {location.state.totalAmount} via {paymentOption}</button>
                                        </div>
                                    </div>
                                )

                                }
                    
                
                <div className="bookingDetails">
                    <div>

                        <h3 className="detailsHead">Booking Details</h3>
                        <div className="detailsText">
                            <p> <FaBus /> BusName: <span></span></p>
                            <p>Starting Point:</p>
                            <p>Destination:</p>
                            <p>Number of Seats: {location.state.noOfSeats}</p>
                            <p>Date: {location.state.date}</p>
                            <p>Total amount: {location.state.totalAmount}</p>
                        </div>
                    </div>
                    <div>

                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default BookingProcess;