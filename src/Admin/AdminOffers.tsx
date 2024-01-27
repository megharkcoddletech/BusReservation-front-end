import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import GetApiCall from "../GetApi/GetApiCall";

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

    const response = GetApiCall( `${process.env.REACT_APP_apiURL}/adminBus/viewOffers`)

    response.then(res => {
        const offer = res.data
        setOffers(offer);

    })   
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