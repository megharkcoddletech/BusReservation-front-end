import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import WithStyle  from "../../HOC/WithStyle";

interface Booking {
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

const Booking:React.FunctionComponent = (style) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('user')
    const [bookingDetails, setBookingDetails] = useState<Booking[]>([])
    const [ticket, setTicket] = useState<Ticket[]>([])
    const [noBooking, setNoBooking] = useState<boolean>(true)
    const [date, setDate] = useState<{ date: string }>({
        date: ''
    })
    const [currentDate, setCurrentDate] = useState<boolean>(false)
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setDate({ ...date, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_apiURL}/userBooking/viewBooking`, {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
            )
            if (data.success === true) {
                setBookingDetails(data.data)
                setNoBooking(false)
                setCurrentDate(false)
            } else {
                setNoBooking(true)
                setCurrentDate(true)
            }
        }
        fetch();
    }, [token])


    function bookingFilter() {
        if (date.date !== undefined) {
            axios(`${process.env.REACT_APP_apiURL}/userBooking/viewBooking?date=${encodeURIComponent(date.date)}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                if (res.data.success === true) {
                    setNoBooking(false)
                    setBookingDetails(res.data.data)
                } else {
                    setNoBooking(true)
                }

            }).catch(e => {
                console.log(e);
            })
        }
    }
    function viewTicket(e: any) {
        const bookId = e.target.value
        axios(`${process.env.REACT_APP_apiURL}/userBooking/singleTicket?bookingId=${encodeURIComponent(bookId)}`, {
            method: 'GET',
            headers: {
                'Content-type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.success === true) {
                setTicket(res.data.data)
            } else {
                alert('no tickets ')
            }
        }).catch(e => {
            console.log(e);
        })
    }

    if (ticket.length > 0) {
        navigate('/ticket', { state: { ticket } })
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="mainform">
                <div>
                    <div>
                        <p>searching booking </p>
                        <input type="date" name="date" value={date.date} onChange={(e) => handleChange(e)} />
                        <button className="checkBookingBtn" onClick={bookingFilter}><CiSearch /></button>
                    </div>
                    <div>
                        {
                            noBooking ?
                                (
                                    <div>
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
    )
}

export default WithStyle(Booking)
