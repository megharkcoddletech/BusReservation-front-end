import React from "react";
import WithStyle from '../HOC/WithStyle'
import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminViewSeats: React.FunctionComponent = (style) => {
    const location = useLocation()
    const bus = location.state
    const seats = bus.seats
    
    return (

        <div>
            <AdminNavbar></AdminNavbar>
            <table style={style}>
                <thead>
                    <tr>
                        <th>
                            Seat Number
                        </th>
                        <th>
                            Seat Type
                        </th>
                        <th>
                            Deck Type
                        </th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        seats.map((e: any) => (
                            <tr key={e.id}>
                                <td> {e.id}</td>
                                <td>{e.seatType}</td>
                                <td>{e.deckType}</td>
                                <td>{e.rate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )

}


export default WithStyle(AdminViewSeats)
