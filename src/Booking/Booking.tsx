import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

interface FormData {
    main: string;
    id: string;
    passengerName: string;
    passengerEmail: string;
    passengerNumber: string;
    passengerAge: string;
}
const Booking = () => {

    const [form, setForm] = useState<FormData[]>([])
    const location = useLocation()
    const b = location.state
    console.log(b.bookSeat);
    const selectedSeat = b.bookSeat

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setForm({ ...form, [e.target.name]: e.target.value })
    }
    async function api(url: string = "", data = {}) {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        })
        return result.json();
    }
    const book = () => {
        api(`${process.env.REACT_APP_apiURL}/userBooking/addBooking`, form).then((data) => {
            if (data.success === true) {
                alert('Booking completed')
            } else {
                alert(data.message)
            }
        })
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="mainform">
                {
                    selectedSeat.map((item: any, index: number) => {
                        return (
                            <div key={item.id}>
                                <form>
                                    <p>Seat Number{item.id} </p>
                                    <input type="text" placeholder="passenger name" name="passengerName" onChange={(e) => handleChange(e)} /><br></br>
                                    <input type="email" placeholder="passenger email" name="passengerEmail" onChange={(e) => handleChange(e)} /><br></br>
                                    <input type="number" placeholder="passenger phone" name="passengerPhone" onChange={(e) => handleChange(e)} /><br></br>
                                    <input type="number" placeholder="passenger age" name="passengerAge" onChange={(e) => handleChange(e)} /><br></br>
                                </form>
                            </div>
                        )
                    })
                }
                <button onClick={book}>book</button>
            </div>
        </div>
    )
}

export default Booking