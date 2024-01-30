import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import WithStyle from "../../HOC/WithStyle";
import Footer from "../../Footer/Footer";


const Ticket: React.FunctionComponent = (style) => {
    const navigate = useNavigate()
    const location = useLocation();
    const ticket = location.state.ticket

    const  token = localStorage.getItem('token')


    async  function cancelSeats(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, booking_id:number) {
                
        const id = e.currentTarget.value;        
        
        const seatId = parseInt(id);
        const bookiId = booking_id
         let url = `${process.env.REACT_APP_apiURL}/userBooking/cancelSeat`;
        
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({ status:"cancelled", id: seatId , bookingId: bookiId})
        }
        fetch(url, requestOptions)
        .then((res) =>{
            console.log(res.json());
            if(res.ok) {
             alert('ticket cancelled')
             navigate('/booking')
            }
        })
        .then ((data) => {
            console.log('da', data);

        }
            
            )
            .catch((err) => {
             console.log('err', err);
             
            })
    }    

    return (
        <div>
            <div className="navbarDiv">
                <Navbar></Navbar>
            </div>
            <div className="mainform">
                <div className="innerdivTicket">
                    <h3>Your Ticket Details</h3>
                    <table {...style}>
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
                                   gender
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
                                            <td>{s.gender}</td>
                                            <td>{s.passenger_age}</td>
                                            <td>{s.status}</td>
                                            <td><button className="cancelTicket" value={s.seats_id} onClick={(e) => cancelSeats(e, s.booking_id)}>cancel</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default WithStyle(Ticket);