import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

interface Offer {
    id: number;
    bus_id: number,
    offer_name: string;
    offer_description: string;
    rate: number;
    validaity_start: string,
    validity_ends: string;
    is_Active: boolean,
    created: string;
    modified: string;
    conditions: string;
}

const AdminOffers = () => {

    const [offers, setOffers] = useState<Offer[]>([])

    const token = localStorage.getItem('token')
    useEffect(()=> {
        const fetch = async () => {
            const url = `${process.env.REACT_APP_apiURL}/adminBus/viewOffers`
      
            const { data } = await axios.get(url, {
              headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            }
            )

            if(data.succes === true) {
                const buses = data.data
                setOffers(buses);
            } 
          }
          fetch();
    }, [token])    
       console.log('poff' ,offers);
       
    return (
        <div>
            <AdminNavbar></AdminNavbar>
            <p>
                Offers
            </p>
        </div>
    )

}

export default AdminOffers