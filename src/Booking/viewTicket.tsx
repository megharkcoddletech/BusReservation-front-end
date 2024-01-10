import React from "react";
import { useLocation } from "react-router-dom";

const Ticket = () => {
    const location = useLocation();

    console.log('ddd', location.state.ticket);
    const ticket = location.state.ticket

    console.log('ti', ticket);


    return (
        <div>
            <table>
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
                                    <td>{s.passenger_Phone}</td>
                                    <td>{s.passenger_age}</td>
                                    <td>{s.status}</td>
                                    <button>cancel</button>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Ticket;