import React from "react";
import WithStyle from '../HOC/WithStyle'
import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";


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
interface Booking {
    id: number
}


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
