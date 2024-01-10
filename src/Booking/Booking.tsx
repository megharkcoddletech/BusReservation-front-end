import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom"

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

const Booking = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('user')
    const [bookingDetails, setBookingDetails] = useState<Booking[]>([])
    const [ticket, setTicket] = useState<Ticket[]>([])
    const [noBooking, setNoBooking] = useState<boolean>(true)
    const [date, setDate] = useState<{ date: string }>({
        date: ''
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setDate({ ...date, [e.target.name]: e.target.value })
    }
    console.log('booking view, token', token);

    console.log('date booking filter', date.date);

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
                console.log('dst', data);
                console.log(data.message);
                const bookkings = data.data.data
                console.log('gbookings', bookkings);
                console.log(Array.isArray(bookkings));
                setNoBooking(false)
            } else {
                setNoBooking(true)
                console.log('ff', data);
            }
        }
        fetch();
    }, [])


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
                    console.log('data on date', res.data.data);
                    setBookingDetails(res.data.data)
                } else {
                    setNoBooking(true)
                    console.log('daata false on date', res.data);
                }

                console.log('setBookingDetails', bookingDetails);
            }).catch(e => {
                console.log(e);
            })
        }
    }

    function viewTicket(e: any) {
        const bookId = e.target.value
        console.log('target booking id', bookId);
        console.log('book indise details', bookingDetails);
        axios(`${process.env.REACT_APP_apiURL}/userBooking/singleTicket?bookingId=${encodeURIComponent(bookId)}`, {
            method: 'GET',
            headers: {
                'Content-type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.success === true) {
                console.log('ticket', res.data.data);
                setTicket(res.data.data)
                console.log('settiket', ticket);

            } else {
                alert('no tickets ')
                console.log('ticket dtta', res.data);
            }

        }).catch(e => {
            console.log(e);
        })

    }

    function vticket() {
        navigate('/ticket', { state: { ticket } })

    }
    console.log('too', ticket);

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
                                        <p>no booking on {date.date}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <table>
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
                                                                <td><button value={item.bookingId} onClick={(e) => viewTicket(e)}>Get Ticket</button></td>
                                                                <td><button onClick={vticket}>view ticket</button></td>
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

export default Booking
