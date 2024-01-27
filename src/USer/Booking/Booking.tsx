import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import WithStyle from "../../HOC/WithStyle";
import GetApiCall from "../../GetApi/GetApiCall";
import './Booking.css'
import Footer from "../../Footer/Footer";

interface BookingData {
    bookingId: number;
    name: string;
    busId: number;
    busName: string;
    bookingDate: string;
    noOfSeats: number;
    totalAmount: number;
    status: string;
    startingPoint: string;
    destination: string;
    boardingTime: string;
    deboardingTime: string;
}

interface Ticket {
    id: number;
    busId: number;
    bookingId: number;
    seatsId: number;
    status: string;
    passengerName: string;
    passengerEmail: string;
    passengerPhone: number;
    passengerAge: number,
    created: string,
    modified: string;
}

const Booking: React.FunctionComponent = (style) => {
    const navigate = useNavigate()
    const [bookingDetails, setBookingDetails] = useState<BookingData[]>([])
    const [ticket, setTicket] = useState<Ticket[]>([])
    const [noBooking, setNoBooking] = useState<boolean>(true)
    const [date, setDate] = useState<{ date: string }>({
        date: ''
    })
    const [bookingId, setBookingId] = useState<{ bookingId: number }>({ bookingId: 0 })

    const [currentDate, setCurrentDate] = useState<boolean>(false)
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setDate({ ...date, [e.target.name]: e.target.value })
    }

    const getBooking = GetApiCall(`${process.env.REACT_APP_apiURL}/userBooking/viewBooking`)
    getBooking.then(res => {
        console.log('booking res', res);
    }).catch(err => {
        console.log(err);
    })


    if (date.date !== undefined) {
        const checkBooking = GetApiCall(`${process.env.REACT_APP_apiURL}/userBooking/viewBooking?date=${encodeURIComponent(date.date)}`)
        checkBooking.then(res => {
            console.log('filtr booking', res);

            if (Array.isArray(res) && res.length > 0) {
                setNoBooking(false)
                setBookingDetails(res)
                setCurrentDate(false)
            } else {
                setNoBooking(true)
            }
        }).catch(e => {
            console.log(e);
        })
    }

    function viewTicket(e: any) {


        const bookId = e.target.value
        setBookingId(bookId)

        const getTicket = GetApiCall(`${process.env.REACT_APP_apiURL}/userBooking/singleTicket?bookingId=${encodeURIComponent(bookId)}`)
        getTicket.then(res => {
            console.log('ticket', res);
            setTicket(res)
        }).catch(err => {
            console.log(err);

        })
    }

    if (ticket.length > 0) {
        navigate('/ticket', { state: { ticket, bookingId } })
    }

    return (



        <div>
            <div className="navbarDiv">
                <Navbar></Navbar>
            </div>
            <div className="mainform">
                <div className="innerdiv">
                    <div>
                        <h3 className="seachText">Searching Booking </h3>
                        <div>
                            <label className="chooseDate">Choose Date</label>
                            <input className="date" type="date" name="date" value={date.date} onChange={(e) => setDate({ date: e.currentTarget.value })} />

                        </div>

                        <div>
                            {
                                noBooking ?
                                    (
                                        <div className="BookingMain">
                                            <p>no booking
                                                {
                                                    currentDate ?
                                                        (
                                                            'today'
                                                        ) : (<></>)
                                                }
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <table style={style}>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Bus Name
                                                        </th>
                                                        <th>
                                                            Booking Date
                                                        </th>
                                                        <th>
                                                            starting Point
                                                        </th>
                                                        <th>
                                                            Destination
                                                        </th>
                                                        <th>
                                                            Boarding time
                                                        </th>
                                                        <th>
                                                            Deboarding time
                                                        </th>
                                                        <th>
                                                            No: of seats
                                                        </th>
                                                        <th>
                                                            Total amount
                                                        </th>
                                                        <th>
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        bookingDetails.map((item) => {
                                                            return (
                                                                <tr key={item.bookingId}>
                                                                    <td>{item.busName}</td>
                                                                    <td>{item.bookingDate}</td>
                                                                    <td>{item.startingPoint}</td>
                                                                    <td>{item.destination}</td>
                                                                    <td>{item.boardingTime}</td>
                                                                    <td>{item.deboardingTime}</td>
                                                                    <td>{item.noOfSeats}</td>
                                                                    <td>{item.totalAmount}</td>
                                                                    <td>{item.status}</td>
                                                                    <td><button value={item.bookingId} onClick={(e) => viewTicket(e)}>view Tickets</button></td>
                                                                </tr>
                                                            )

                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default WithStyle(Booking)
