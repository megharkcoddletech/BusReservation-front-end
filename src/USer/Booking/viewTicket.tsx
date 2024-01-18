import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import WithStyle from "../../HOC/WithStyle";
const Ticket:React.FunctionComponent = (style) => {

    const location = useLocation();
    const ticket = location.state.ticket

    function cancelBooking() {
        const option = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        }

        fetch(`${process.env.REACT_APP_apiURL}/userBooking/cancelBooking`, option)
            .then(res => res.json())
            .then(data => data)
    }

    return (
        <div>
            <Navbar></Navbar>
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
                                    <button onClick={cancelBooking}>cancel</button>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default WithStyle(Ticket);