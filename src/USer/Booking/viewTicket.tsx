import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import WithStyle from "../../HOC/WithStyle";
import axios from 'axios';
import Footer from "../../Footer/Footer";


const Ticket: React.FunctionComponent = (style) => {

    const location = useLocation();
    const ticket = location.state.ticket

    const [bookingId, setBookingId] = useState<{ bookingId: number }>({ bookingId: 0 })
    const [seatsToCancel, setSeatsToCancel] = useState<number[]>([])

    function cancelSeats(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const id = e.currentTarget.value;


        const filterSeat = seatsToCancel.some((item) => item === parseInt(id))
        const currentBooking = ticket.filter((item: { seats_id: number; }) => item.seats_id === parseInt(id))
        const bookId = currentBooking.map((item: { booking_id: number; }) => item.booking_id)


        if (!filterSeat) {
            setSeatsToCancel(prev => {
                return [...prev, parseInt(id)];
            })

        }


    }

    console.log('ou seats to ', seatsToCancel);

    function cancelBooking() {

        const token = localStorage.getItem('token')
        setBookingId(location.state.bookingId)
        console.log('bok id', bookingId);
        console.log('loc st bid', location.state.bookingId);

        const data = {
            bookingId: location.state.bookingId,
            seatsToCancel: seatsToCancel
        }
        axios.put(`${process.env.REACT_APP_apiURL}/userBooking/cancelBooking?bookingId=${location.state.bookingId}&seatsToCancel=${seatsToCancel}`, data, {
            headers: {
                'Content-type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
            .then(response => {
                console.log('res', response);
            }
            )
    }

    return (
        <div>
            <div className="navbarDiv">
                <Navbar></Navbar>
            </div>
            <div className="mainform">
                <div className="innerdivTicket">
                    <h3>Your Ticket Details</h3>
                    <table style={style}>
                        <thead>
                            <tr>
                                <th>
                                    Ticket id
                                </th>
                                <th>
                                    Seat number
                                </th>
                                <th>
                                    passenger Name
                                </th>
                                <th>
                                    Passenger email
                                </th>
                                <th>
                                    passenger phone
                                </th>
                                <th>
                                    passenger age
                                </th>
                                <th>
                                    status
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                ticket.map((s: any) => {
                                    return (
                                        <tr key={s.id}>
                                            <td>
                                                {s.id}
                                            </td>
                                            <td>
                                                {s.seats_id}
                                            </td>
                                            <td>
                                                {s.passenger_name}
                                            </td>
                                            <td>
                                                {s.passenger_email}
                                            </td>
                                            <td>{s.passenger_phone}</td>
                                            <td>{s.passenger_age}</td>
                                            <td>{s.status}</td>
                                            <td><button className="cancelTicket" value={s.seats_id} onClick={(e) => cancelSeats(e)}>cancel</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <button className="cancelTicket" onClick={cancelBooking}>Cancel booking</button>

                    </table>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default WithStyle(Ticket);